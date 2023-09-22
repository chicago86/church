import { GraphQLTaggedNode, loadQuery } from "react-relay/hooks";
import { homeRootQuery, homeRootQuery$variables } from "./components/home-root/__generated__/homeRootQuery.graphql";
import { videoLibraryRootQuery$variables } from "./components/video-library/__generated__/videoLibraryRootQuery.graphql";
import { videoPlayerRootQuery, videoPlayerRootQuery$variables } from "./components/video-player/__generated__/videoPlayerRootQuery.graphql";
import JSResource from "./jsresource";
import environment from "./relay-environment";
import { getAuthenticated, getMainVariables, get_p_tguid, setVariables } from "./utils";

// NOTE: In order to rerender translations on language change each component rendered by route must have useSelector with internationalization inside
const routes = [
  {

    component: JSResource("App", () => import("./components/app/app")),

    // The App component does not depend on external data so does not preload any.
    prepare: () => { return {} },

    routes: [
      {
        path: "/",
        exact: true,

        // A lazy reference to the component for the home route. Note that we intentionally don't
        // use React.lazy here: that would start loading the component only when it's rendered.
        // By using a custom alternative we can start loading the code instantly. This is
        // especially useful with nested routes, where React.lazy would not fetch the
        // component until its parents code/data had loaded.
        component: JSResource("HomeRoot", () => import("./components/home-root/home-root")),


        // A function to prepare the data for the `component` in parallel with loading
        // that component code. The actual data to fetch is defined by the component
        // itself - here we just reference a description of the data - the generated query.
        prepare: (params: Object) => {
          const preloadableRequest: GraphQLTaggedNode = require("./components/home-root/__generated__/homeRootQuery.graphql");
          let variables = {}

          setVariables('homeRootQuery', variables)

          return {
            preloadedQuery: loadQuery<homeRootQuery>(
              environment,
              preloadableRequest,
              variables,
              { fetchPolicy: "store-or-network" },
            ),
          };
        },
      },
      {
        path: "/video-player/:video_clip_guid",
        exact: true,
        component: JSResource("VideoPlayer", () => import("./components/video-player/video-player")),

        prepare: (params: { video_clip_guid: string }) => {
          console.log(' params.video_clip_guid', params.video_clip_guid)
          const preloadableRequest: GraphQLTaggedNode = require("./components/video-player/__generated__/videoPlayerRootQuery.graphql");
          const variables: videoPlayerRootQuery$variables = {
            video_clip_guid: params.video_clip_guid
          }

          return {
            preloadedQuery: loadQuery<videoPlayerRootQuery>(
              environment,
              preloadableRequest,
              variables,
              { fetchPolicy: "store-or-network" },
            ),
          }
        },
      },
    ],
  },
];

export default routes;

export type Routes = typeof routes;
