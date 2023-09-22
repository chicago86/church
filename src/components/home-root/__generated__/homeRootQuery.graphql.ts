/**
 * @generated SignedSource<<ab145c2a391153c736059561dd0b4ca9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type homeRootQuery$variables = {};
export type homeRootQuery$data = {
  readonly base_viewer_connection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly created_at: any;
        readonly feature: any | null;
        readonly id: string;
        readonly location: any | null;
        readonly modified_at: any | null;
        readonly status_code: number;
        readonly video_clip: {
          readonly clip_url: string;
          readonly title: string;
          readonly video_clip_guid: any;
        };
        readonly video_clip_guid: any;
        readonly viewer_guid: any;
      };
    }>;
  };
};
export type homeRootQuery = {
  response: homeRootQuery$data;
  variables: homeRootQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "feature",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "location",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "modified_at",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "created_at",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status_code",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewer_guid",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "video_clip_guid",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v9 = {
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
    "name": "homeRootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "base_viewerConnection",
        "kind": "LinkedField",
        "name": "base_viewer_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "base_viewerEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "base_viewer",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "base_video_clip",
                    "kind": "LinkedField",
                    "name": "video_clip",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v7/*: any*/)
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
    "name": "homeRootQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "base_viewerConnection",
        "kind": "LinkedField",
        "name": "base_viewer_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "base_viewerEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "base_viewer",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "base_video_clip",
                    "kind": "LinkedField",
                    "name": "video_clip",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v7/*: any*/),
                      (v0/*: any*/)
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d7f331702dbb96a60a0851938b39e927",
    "id": null,
    "metadata": {},
    "name": "homeRootQuery",
    "operationKind": "query",
    "text": "query homeRootQuery {\n  base_viewer_connection {\n    edges {\n      node {\n        id\n        feature\n        location\n        modified_at\n        created_at\n        status_code\n        viewer_guid\n        video_clip_guid\n        video_clip {\n          title\n          clip_url\n          video_clip_guid\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "17319e8246f3a2fbe569bffd163db053";

export default node;
