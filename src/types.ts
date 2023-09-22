import { GraphQLTaggedNode } from "react-relay/hooks";

export interface QueryLoader {
  preloadableRequest: GraphQLTaggedNode;
  preloadedQuery: any;
  loadQuery: Function;
}

export declare interface KeyValue<K, V> {
  key: K;
  value: V;
}

export declare interface PathValue<K, V> {
  path: K;
  value: V;
}

export declare interface Option {
  status_code: number;
  name: string;
}

export interface PageInfo {
  hasNextPage: Boolean,
  hasPreviousPage: Boolean,
  endCursor: string,
  startCursor: string
}

// GraphQL introspection interfaces.
export interface Schema {
  data: Data;
}
export interface Data {
  __type: Type;
}
export interface Type {
  kind: string;
  name: string;
  fields?: (Field)[] | null;
  enumValues?: EnumValue[];
  inputFields?: (InputField)[] | null;
}

export interface Field {
  name: string;
  description?: string | null;
}

export interface EnumValue {
  name: string;
  description?: string | null;
}

export interface InputField {
  name: string;
  description?: null;
  type: InputFieldType;
}

export interface InputFieldType {
  name: string;
}

export interface Address {
  amenity: string | null;
  borough: string | null;
  building: string | null;
  city: string | null;
  country: string | null;
  district: string | null;
  house_number: string | null;
  neighbourhood: string | null;
  postcode: string | null;
  road: string | null;
  suburb: string | null;
  town: string | null;
  village: string | null;
}

export interface RouteData {
  isExact: boolean,
  params: {
    langtag: number,
    video_clip_guid: string
  },
  path: string,
  url: string
}

export interface ClientData {
  country_code: string
  country_name: string
  city: any
  postal: any
  latitude: number
  longitude: number
  IPv4: string
  state: any
}