import { ASTNode, FieldNode, Kind, Lexer, parse, print, Source, TokenKind, visit } from 'graphql';
import { Variables } from 'relay-runtime';
import { v4 as uuidv4 } from "uuid";
import { homeRootQuery$variables } from '../components/home-root/__generated__/homeRootQuery.graphql';
import { Schema } from "../types";

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`
  if (!value) return null

  const parts = value.split(`; ${name}=`)
  if (!parts) return null

  return (parts.length === 2) ? parts.pop()!.split(';').shift() ?? null : null
}

export function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Returns last set of root query variables.
export function getVariables(): homeRootQuery$variables {
  return JSON.parse(localStorage.getItem("homeRootQuery-variables") || '{}')
}

// Returns last set of root query variables called while on the main tab.
export function getMainVariables(): homeRootQuery$variables | undefined {
  const variables = localStorage.getItem("homeRootQuery-variables-main")
  return variables ? JSON.parse(variables) : undefined
}

// For all queries, saves query variables to local storage. 
// For root query only, keeps track of main tab variables.
export function setVariables(name: string, variables: Variables | null | undefined) {
  // No undefined variables to avoid parameter mismatch errors on the graphQL server.
  // Also trim " from boolean values otherwise graphQL server throws a type mismatch error. 
  let definedVariables = { ...variables }
  Object.keys(definedVariables).forEach(key => {
    // Do not drop relay internal variables.
    if (key.startsWith('__relay_internal__pv__')) return

    // Leave the value as is if there is one.
    if (Reflect.get(definedVariables, key) != null) return

    // Drop the variable because its value is null or undefined 
    //@ts-ignore
    delete definedVariables[key]
  })

  const strVariables = JSON.stringify(definedVariables)
  localStorage.setItem(`${name}-variables`, strVariables)

  if (definedVariables.p_latitude || definedVariables.p_longitude) localStorage.setItem(`${name}-variables-main`, strVariables)

  return definedVariables
}
export function getAuthenticated() {
  return localStorage.getItem("authenticated")?.toLowerCase() === 'true'
}

export function get_p_tguid() {
  var cookie_p_tguid = getCookie('p_tguid');
  var cookie_p_tguid_updated_at = Number(getCookie('p_tguid_updated_at'));

  var ls_p_tguid = localStorage.getItem("p_tguid")
  var ls_p_tguid_updated_at = Number(localStorage.getItem("p_tguid_updated_at"))

  var p_tguid = uuidv4();
  const updated_at = Date.now().toString()
  if (cookie_p_tguid && ls_p_tguid) p_tguid = cookie_p_tguid_updated_at > ls_p_tguid_updated_at ? cookie_p_tguid : ls_p_tguid   // found in 2 places, chose more recent
  else if (cookie_p_tguid && !ls_p_tguid) p_tguid = cookie_p_tguid
  else if (!cookie_p_tguid && ls_p_tguid) p_tguid = ls_p_tguid

  setCookie('p_tguid', p_tguid, 365);
  setCookie('p_tguid_updated_at', updated_at, 365);

  localStorage.setItem("p_tguid", p_tguid)
  localStorage.setItem("p_tguid_updated_at", updated_at)

  return p_tguid
}

export const guidToClassName = (guid: string | number | undefined) => typeof guid === "string" && `${guid.replace(/-/g, "")}`;

// Returns the list of field names of a given graphql query sent with the body parameter.
export function getFieldNames(body: string, name?: string) {
  const s = new Source(body, name);
  const l = new Lexer(s);
  const tables = [];
  var edges = false;
  var node = false;
  var connection = []
  var table_schema = ''
  var table_name = ''
  var indent = 0;  // this is to be able to ignore nested connections.
  do {
    var token = l.advance();
    if (token.kind !== TokenKind.NAME) continue;
    if (token.value.endsWith("_connection")) {
      connection = token.value.split('_');
      table_schema = connection.shift() ?? '';
      connection.pop(); // ignore '_connection' suffix
      table_name = connection.join('_') ?? '';
      indent++;
    }

    if (token.value === 'edges') edges = true;
    if (token.value === 'node') node = true;

    // Note, the query is structured in such a way that all tokens after edges/node are query field names.
    if (edges && node && token.value !== 'node') tables.push(`${table_schema}.${table_name}.${token.value}`);
  } while (token && token.kind !== TokenKind.EOF);

  return [...new Set(tables)];
}

export function getTables(body: string | null) {
  if (!body) return [];

  const s = new Source(body);
  const l = new Lexer(s);
  const tables = [];
  do {
    var token = l.advance();
    if (token.kind !== TokenKind.NAME) continue;
    const suffixes = new RegExp('(_arr|_connection|_obj|_by_pk|_one)', 'g')
    if (token.value.replace(suffixes, '') !== token.value) tables.push(token.value);
  } while (token && token.kind !== TokenKind.EOF);

  return [...new Set(tables)];
}

function getNearestTable(ancestors: readonly (ASTNode | readonly ASTNode[])[]): FieldNode | null {
  for (let i = ancestors.length - 1; i >= 0; i--) {
    if (Array.isArray(ancestors[i])) continue;

    const kind = Reflect.get(ancestors[i], 'kind');
    if (kind !== Kind.FIELD) continue;

    const f = ancestors[i] as FieldNode;
    const suffixes = new RegExp('(_arr|_connection|_obj|_by_pk|_one)', 'g')
    if (f.name.value.replace(suffixes, '') !== f.name.value) return f;
  }

  return null;
}

function processGraphQL(graphqlSource: string, typeName: string, fields: string[] | undefined): string {
  if (!graphqlSource) return graphqlSource
  if (!typeName) return graphqlSource
  if (!fields) return graphqlSource

  // Ignore Relay protocol fields because we only secure our own data not protocol.
  // id is in the list because strictly speaking it is a protocol field.
  const ignore = ['id', 'pageInfo', 'endCursor', 'hasNextPage', 'startCursor', 'hasPreviousPage', 'edges', 'cursor', 'node']
  const queryDocumentNode = parse(graphqlSource)

  // See https://graphql.org/graphql-js/language/#visit
  var editedQuery = visit(queryDocumentNode, {
    Field: {
      enter(node, key, parent, path, ancestors) {
        // @return
        //   undefined: no action
        //   false: skip visiting this node
        //   visitor.BREAK: stop visiting altogether
        //   null: delete this node
        //   any value: replace this node with the returned value

        const fieldName = node.name.value

        if (node.kind !== Kind.FIELD) throw new Error('This AST visitor requires node Kind.FIELD');

        if (ignore.includes(fieldName)) {
          console.debug('ignore protocol field', fieldName)
          return node
        }

        // Ensure we are visiting a field of a right table called typeName.
        const table = getNearestTable(ancestors);
        console.debug(`table for ${fieldName} is `, table?.name.value)
        if (!table || !table.name.value.startsWith(typeName)) {
          console.debug(`ignore ${fieldName}, not child of ${typeName}`)
          return node
        }

        const suffixes = new RegExp('(_arr|_connection|_obj|_by_pk|_one)', 'g')
        if (fieldName.replace(suffixes, '') === typeName) {
          console.debug(`ignore itself ${fieldName} - ${typeName}`)
          return node;
        }

        // Based on the introspection info, drop the field the user has NO access to or return the node untouched.
        if (fields && fields.includes(fieldName)) {
          console.debug(`Access granted ${fieldName}`)
          return node
        } else {
          console.debug(`No access, drop ${fieldName} from typename ${typeName}`)
          return null
        }
      },
      leave(node, key, parent, path, ancestors) {
        // @return
        //   undefined: no action
        //   false: no action
        //   visitor.BREAK: stop visiting altogether
        //   null: delete this node
        //   any value: replace this node with the returned value
      }
    }
  })

  // See https://graphql.org/graphql-js/language/#print
  return print(editedQuery)
}

export function getSecureQuery(text: string | null = null, schemas: Array<Schema>): string {
  if (!text) return '';

  const secured = schemas.reduce((processed, schema) => {
    if (!schema.data || !schema.data.__type) return processed;

    const typeName = schema.data.__type.name;
    const fields = schema.data.__type.fields?.map(v => v.name);
    console.debug('calling', typeName)
    return processGraphQL(processed, typeName, fields)
  }, text);
  return secured;
}

export function getSecureMutation(text: string | null = null, schemas: Array<Schema>): string {
  if (!text) return '';

  const secured = schemas.reduce((processed, schema) => {
    if (!schema.data || !schema.data.__type) return processed;

    // For update the naming convension is update_*_by_pk mask. TODO implement update
    // For upsert the naming convension is insert_*_one mask.
    const isInsert = text.indexOf('_by_pk') < 0
    const typeName = isInsert
      ? `insert_${schema.data.__type.name.replace('_update_column', '')}_one`
      : `update_${schema.data.__type.name.replace('_update_column', '')}_by_pk`

    const fields = isInsert
      ? schema.data.__type.inputFields?.map(v => v.name)
      : schema.data.__type.enumValues?.map(v => v.name)

    // TODO process GraphQL twice because mutation is an upsert? once for the update part and once again for the insert part?
    // TODO secure return values from mutations.
    return processGraphQL(processed, typeName, fields)
  }, text);
  return secured;
}