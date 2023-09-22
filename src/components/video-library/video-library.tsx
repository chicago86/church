import graphql from "babel-plugin-relay/macro"
import React from "react"
import { useLazyLoadQuery } from "react-relay"
import { Virtuoso } from 'react-virtuoso'
import Link from "../../routing/link"
import s from './video-library.module.scss'
import { videoLibraryRootQuery } from "./__generated__/videoLibraryRootQuery.graphql"

export const VideoLibrary: React.FC = () => {
  const gqlQuery = graphql`
    query videoLibraryRootQuery {
      base_video_clip_connection {
        edges {
          node {
            video_clip_guid
            langtag
            title
            clip_url
          }
        }
      }
    }
    `

  const data = useLazyLoadQuery<videoLibraryRootQuery>(
    gqlQuery,
    {}, // no variables in this query, potentially langtag will become a variable
    { fetchPolicy: 'store-or-network' },
  );

  const edges = data?.base_video_clip_connection?.edges?.slice().sort((a, b) => a.node.title.localeCompare(b.node.title)) || []
  return <>
    {
      edges.length
        ? <Virtuoso
          style={{ height: '100%', width: '100%' }}
          initialTopMostItemIndex={{ index: 'LAST' }}
          data={edges}
          followOutput="smooth"
          itemContent={(key, edge) => {
            return <Link key={key} to={`/video-player/${edge.node.video_clip_guid}`} className={s.row}>
              <h5>{edge.node.title}</h5>
            </Link>
          }}
        />
        : <div><h5>The playlist is empty right now</h5></div>
    }
  </>
}