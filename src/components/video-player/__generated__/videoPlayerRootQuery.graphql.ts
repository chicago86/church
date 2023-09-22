/**
 * @generated SignedSource<<4904f0b0c78a7ac56140180f925e852e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type videoPlayerRootQuery$variables = {
  video_clip_guid?: any | null;
};
export type videoPlayerRootQuery$data = {
  readonly base_video_clip_connection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly clip_url: string;
        readonly langtag: string;
        readonly title: string;
        readonly video_clip_guid: any;
      };
    }>;
  };
};
export type videoPlayerRootQuery = {
  response: videoPlayerRootQuery$data;
  variables: videoPlayerRootQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "video_clip_guid"
  }
],
v1 = [
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "_eq",
            "variableName": "video_clip_guid"
          }
        ],
        "kind": "ObjectValue",
        "name": "video_clip_guid"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "video_clip_guid",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "langtag",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clip_url",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "videoPlayerRootQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "base_video_clipConnection",
        "kind": "LinkedField",
        "name": "base_video_clip_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "base_video_clipEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "base_video_clip",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "videoPlayerRootQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "base_video_clipConnection",
        "kind": "LinkedField",
        "name": "base_video_clip_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "base_video_clipEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "base_video_clip",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "58a547d194c96cf19e4d30f1195f89e6",
    "id": null,
    "metadata": {},
    "name": "videoPlayerRootQuery",
    "operationKind": "query",
    "text": "query videoPlayerRootQuery(\n  $video_clip_guid: uuid\n) {\n  base_video_clip_connection(where: {video_clip_guid: {_eq: $video_clip_guid}}) {\n    edges {\n      node {\n        video_clip_guid\n        langtag\n        title\n        clip_url\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "76a49468d9b64808116fbe1969b53f58";

export default node;
