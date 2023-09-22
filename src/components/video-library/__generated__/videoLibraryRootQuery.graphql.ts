/**
 * @generated SignedSource<<0f3139cc54f668244507ffec224b1f69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type videoLibraryRootQuery$variables = {};
export type videoLibraryRootQuery$data = {
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
export type videoLibraryRootQuery = {
  response: videoLibraryRootQuery$data;
  variables: videoLibraryRootQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "video_clip_guid",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "langtag",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "clip_url",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "videoLibraryRootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/)
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "videoLibraryRootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
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
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
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
    "cacheID": "36f405133bda1bfe570037d38a4007b4",
    "id": null,
    "metadata": {},
    "name": "videoLibraryRootQuery",
    "operationKind": "query",
    "text": "query videoLibraryRootQuery {\n  base_video_clip_connection {\n    edges {\n      node {\n        video_clip_guid\n        langtag\n        title\n        clip_url\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f9c105803bb2257d0ecce4f1cc9f0420";

export default node;
