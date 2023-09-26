import graphql from "babel-plugin-relay/macro"
import React from "react"
import { useLazyLoadQuery } from "react-relay"
import { Virtuoso } from 'react-virtuoso'
import Link from "../../routing/link"
import styles from './video-library.module.scss'
import { videoLibraryRootQuery } from "./__generated__/videoLibraryRootQuery.graphql";
import { QRCodeSVG } from "qrcode.react"

const videos = [
  {
    video_clip_guid: '20b64285-8509-4c33-9dc2-510771b4bc1b', qrLink: "", img: require('./images/usa.jpg'), title: "Nature", clip_url: "https://www.youtube.com/watch?v=nqye02H_H6I", language: 'english'
  },
  {
    video_clip_guid: '20b64285-8509-4c33-9dc2-510771b4bc1b', qrLink: "", img: require('./images/french.jpg'), title: "Nature", clip_url: "https://www.youtube.com/watch?v=nqye02H_H6I", language: 'english'
  },
  {
    video_clip_guid: '20b64285-8509-4c33-9dc2-510771b4bc1b', qrLink: "", img: require('./images/germany.jpg'), title: "Nature", clip_url: "https://www.youtube.com/watch?v=nqye02H_H6I", language: 'english'
  },
  {
    video_clip_guid: '20b64285-8509-4c33-9dc2-510771b4bc1b', qrLink: "", img: require('./images/romania.jpg'), title: "Nature", clip_url: "https://www.youtube.com/watch?v=nqye02H_H6I", language: 'english'
  },
  {
    video_clip_guid: '20b64285-8509-4c33-9dc2-510771b4bc1b', qrLink: "", img: require('./images/russia.jpg'), title: "Nature", clip_url: "https://www.youtube.com/watch?v=nqye02H_H6I", language: 'english'
  },
  {
    video_clip_guid: '20b64285-8509-4c33-9dc2-510771b4bc1b', qrLink: "", img: require('./images/spain.jpg'), title: "Nature", clip_url: "https://www.youtube.com/watch?v=nqye02H_H6I", language: 'english'
  },
];

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
  console.log('edges', edges);
  console.log(window.location.href);
  return <div className={styles.videoLibrary}>
    {
      videos.length > 0
        ?
        <Virtuoso
          style={{ height: '100%', width: '100%' }}
          initialTopMostItemIndex={{ index: 'LAST' }}
          data={videos}
          followOutput="smooth"
          itemContent={(key, edge) => {
            return <div key={key} className={styles.linkItem}>
              <Link className={styles.flag} to={`/video-player/${edge.video_clip_guid}`}>
                <img src={edge.img} alt={edge.language} />
              </Link>
              <QRCodeSVG value={`${window.location.href}video-player/${edge.video_clip_guid}`} className={styles.qrCode}/>
            </div>
          }}
        />
        : <h5 className={styles.emptyHeading}>The playlist is empty right now</h5>
    }
  </div>
}