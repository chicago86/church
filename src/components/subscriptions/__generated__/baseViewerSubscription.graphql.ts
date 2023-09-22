/**
 * @generated SignedSource<<7145a3cdca3b139b12f3c3dbb2a520e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type baseViewerSubscription$variables = {};
export type baseViewerSubscription$data = {
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
export type baseViewerSubscription = {
  response: baseViewerSubscription$data;
  variables: baseViewerSubscription$variables;
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
    "name": "baseViewerSubscription",
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
    "type": "subscription_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "baseViewerSubscription",
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
    "cacheID": "f994be73c9146911fdccb449d93015d1",
    "id": null,
    "metadata": {},
    "name": "baseViewerSubscription",
    "operationKind": "subscription",
    "text": "subscription baseViewerSubscription {\n  base_viewer_connection {\n    edges {\n      node {\n        id\n        feature\n        location\n        modified_at\n        created_at\n        status_code\n        viewer_guid\n        video_clip_guid\n        video_clip {\n          title\n          clip_url\n          video_clip_guid\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "05a4e84000040e200dad02b858318840";

export default node;
