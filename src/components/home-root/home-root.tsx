import graphql from "babel-plugin-relay/macro"
import classNames from "classnames"
import React, { Suspense, useCallback, useEffect, useRef } from "react"
import { fetchQuery, useRelayEnvironment } from "react-relay"
import { FetchQueryFetchPolicy, Variables } from "relay-runtime"
import { QueryLoader } from "../../types"
import { setVariables } from "../../utils"
import { ErrorBoundaryWithRetry } from "../error-boundary-with-retry"
import { Grid } from "../grid"
import { Loader } from "../loader"
import { BaseStreamSubscription } from "../subscriptions"
import { VideoLibrary } from "../video-library"
import styles from './home-root.module.scss'
import { useHomeRoot } from "./hooks/use-home-root"
import { homeRootQuery } from "./__generated__/homeRootQuery.graphql"
import { Map } from "../ui2/map"
import { Table } from "../ui2/table"
import { Sidebar } from "../ui2/side-bar";

const { useQueryLoader } = require("react-relay")
const preloadableRequest = require("./__generated__/homeRootQuery.graphql")

// TODO the fragment and the refetchable fragment repeat each other but the former has no @refetchable directive. 
// Also the very same graphql code sits in the homeRootQuery because otherwise data cannot be passed to a sibling branch of react components.
// Is there any way to write the graphql command text only once and then reuse?


//TODO base_viewer_connection first 20 (where status_code: 1), order by, 
graphql`
query homeRootQuery {
  base_viewer_connection {
    edges {
      node {
        id
        feature
        location
        modified_at
        created_at
        status_code
        viewer_guid
        video_clip_guid
        video_clip {
          title
          clip_url
          video_clip_guid
        }
      }
    }
  }
}
`

type Props = {
  prepared: { preloadedQuery: homeRootQuery }
}

const HomeRoot: React.FC<Props> = (props) => {
  const environment = useRelayEnvironment()
  const { homeRoot, setHomeRoot } = useHomeRoot()
  const [preloadedQuery, loadQuery] = useQueryLoader(preloadableRequest) // preloadedQuery is null initially and is only initialized after user executes search
  const panelRef = useRef<HTMLDivElement>(null)

  /**
   * Fetching the query again for different data than was originally rendered by the query.
   * Fetch the query outside of React to avoid showing a Suspense fallback and hiding the already rendered content.
   */
  const refetch = useCallback((variables: Variables, fetchPolicy: FetchQueryFetchPolicy = 'store-or-network') => {
    if (homeRoot.refetching) return

    variables = setVariables('homeRootQuery', variables)
    setHomeRoot({ refetching: true, queryArgs: { variables } })

    // If you need to avoid Suspense:
    // fetchQuery will fetch the query and write the data to the Relay store. This will ensure that when we re-render, the data is already cached and we don't suspend.
    fetchQuery(environment, preloadableRequest, variables, { fetchPolicy })
      .subscribe({
        complete: () => {
          // *After* the query has been fetched, we update our state to re-render with the new fetchKey and fetchPolicy.
          // At this point the data for the query should be cached, so we use the 'store-only' fetchPolicy to avoid suspending.
          setHomeRoot((prev) => (
            {
              refetching: false,
              queryArgs: {
                options: {
                  fetchKey: (prev?.queryArgs?.options?.fetchKey ?? 0) + 1,
                  fetchPolicy: "store-only",
                },
                variables,
              },
            }
          ))

          loadQuery(variables, homeRoot?.queryArgs?.options)
        },
        error: () => {
          setHomeRoot({ refetching: false })
        },
      })
  }, [setHomeRoot, homeRoot.refetching, environment])

  //state.refetch = refetch

  const queryLoader: QueryLoader = {
    preloadableRequest,
    preloadedQuery: preloadedQuery || props.prepared.preloadedQuery,
    loadQuery
  }

  BaseStreamSubscription()

  return <ErrorBoundaryWithRetry>
    <div className={styles.homeRoot}>
      <div className={styles.content}>
        <Map />
        <Grid preloadedQuery={preloadedQuery || props.prepared.preloadedQuery} />
      </div>
      <Sidebar/> 
    </div>
  </ErrorBoundaryWithRetry>
}

export default HomeRoot