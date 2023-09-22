/**
 * @generated SignedSource<<61d585afcc6cbfdf4fa962527f380122>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type base_video_clip_constraint = "uq__video_clip__video_clip_guid" | "video_clip_pkey" | "%future added value";
export type base_video_clip_update_column = "clip_url" | "created_at" | "langtag" | "modified_at" | "modified_by" | "title" | "video_clip_guid" | "%future added value";
export type base_viewer_insert_input = {
  created_at?: any | null;
  feature?: any | null;
  ipaddr?: string | null;
  modified_at?: any | null;
  status_code?: number | null;
  video_clip?: base_video_clip_obj_rel_insert_input | null;
  video_clip_guid?: any | null;
  viewer_guid?: any | null;
};
export type base_video_clip_obj_rel_insert_input = {
  data: base_video_clip_insert_input;
  on_conflict?: base_video_clip_on_conflict | null;
};
export type base_video_clip_insert_input = {
  clip_url?: string | null;
  created_at?: any | null;
  langtag?: string | null;
  modified_at?: any | null;
  modified_by?: number | null;
  title?: string | null;
  video_clip_guid?: any | null;
};
export type base_video_clip_on_conflict = {
  constraint: base_video_clip_constraint;
  update_columns: ReadonlyArray<base_video_clip_update_column>;
  where?: base_video_clip_bool_exp | null;
};
export type base_video_clip_bool_exp = {
  _and?: ReadonlyArray<base_video_clip_bool_exp> | null;
  _not?: base_video_clip_bool_exp | null;
  _or?: ReadonlyArray<base_video_clip_bool_exp> | null;
  clip_url?: String_comparison_exp | null;
  created_at?: timestamp_comparison_exp | null;
  langtag?: String_comparison_exp | null;
  modified_at?: timestamp_comparison_exp | null;
  modified_by?: Int_comparison_exp | null;
  title?: String_comparison_exp | null;
  video_clip_guid?: uuid_comparison_exp | null;
};
export type String_comparison_exp = {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: ReadonlyArray<string> | null;
  _iregex?: string | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: ReadonlyArray<string> | null;
  _niregex?: string | null;
  _nlike?: string | null;
  _nregex?: string | null;
  _nsimilar?: string | null;
  _regex?: string | null;
  _similar?: string | null;
};
export type timestamp_comparison_exp = {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: ReadonlyArray<any> | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: ReadonlyArray<any> | null;
};
export type Int_comparison_exp = {
  _eq?: number | null;
  _gt?: number | null;
  _gte?: number | null;
  _in?: ReadonlyArray<number> | null;
  _is_null?: boolean | null;
  _lt?: number | null;
  _lte?: number | null;
  _neq?: number | null;
  _nin?: ReadonlyArray<number> | null;
};
export type uuid_comparison_exp = {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: ReadonlyArray<any> | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: ReadonlyArray<any> | null;
};
export type videoPlayerInsertViewerMutation$variables = {
  object?: base_viewer_insert_input | null;
};
export type videoPlayerInsertViewerMutation$data = {
  readonly insert_base_viewer_one: {
    readonly viewer_guid: any;
  } | null;
};
export type videoPlayerInsertViewerMutation = {
  response: videoPlayerInsertViewerMutation$data;
  variables: videoPlayerInsertViewerMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": {},
    "kind": "LocalArgument",
    "name": "object"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "object",
    "variableName": "object"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewer_guid",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "videoPlayerInsertViewerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "base_viewer",
        "kind": "LinkedField",
        "name": "insert_base_viewer_one",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "videoPlayerInsertViewerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "base_viewer",
        "kind": "LinkedField",
        "name": "insert_base_viewer_one",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b60529516b2b7e2433460095d9c7630a",
    "id": null,
    "metadata": {},
    "name": "videoPlayerInsertViewerMutation",
    "operationKind": "mutation",
    "text": "mutation videoPlayerInsertViewerMutation(\n  $object: base_viewer_insert_input = {}\n) {\n  insert_base_viewer_one(object: $object) {\n    viewer_guid\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8ad394074679635f3424e79a5b184f18";

export default node;
