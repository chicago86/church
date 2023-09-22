import React from "react"
import { PreloadedQuery, usePreloadedQuery } from "react-relay"
import { Virtuoso } from 'react-virtuoso'
import { homeRootQuery, homeRootQuery$data } from "../home-root/__generated__/homeRootQuery.graphql"
import s from './grid.module.scss'

const preloadableRequest = require("../home-root/__generated__/homeRootQuery.graphql")

interface Props {
  preloadedQuery: PreloadedQuery<homeRootQuery>,
}
export const Grid: React.FC<Props> = ({ preloadedQuery }) => {
  const data: homeRootQuery$data = usePreloadedQuery(preloadableRequest, preloadedQuery)

  const edges = data?.base_viewer_connection?.edges?.slice().sort((a, b) => a.node.modified_at - b.node.modified_at) || []
  return <>
    {
      edges.length
        ? <Virtuoso
          style={{ height: '100%', width: '100%' }}
          initialTopMostItemIndex={{ index: 'LAST' }}
          data={edges}
          followOutput="smooth"

          itemContent={(key, edge) => {
            // const i = edges.findIndex(x => x.node.id === edge.node.id);
            // const previousSibling = i == 0 ? undefined : edges.at(i - 1)?.node
            return <div className={s.row} key={key}>
              <span>{edge.node.modified_at}</span>
              <span>{edge.node.feature.properties.address.country}</span>
              <span>{edge.node.feature.properties.address.city}</span>
            </div>
          }}
        />
        : <div><h5>There are no active video views right now</h5></div>
    }
  </>
}