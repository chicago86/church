import graphql from "babel-plugin-relay/macro";
import { Feature } from "geojson";
import React, { useEffect, useState } from 'react';
import { PreloadedQuery, useMutation, usePreloadedQuery } from 'react-relay';
import { v4 as uuidv4 } from "uuid";
import { RouteData } from '../../types';
import { useData } from "./use-data";
import styles from "./video-player.module.scss";
import { videoPlayerRootQuery } from "./__generated__/videoPlayerRootQuery.graphql";
import { QRCodeSVG } from "qrcode.react";
import YouTube from 'react-youtube';

const preloadableRequest = require("./__generated__/videoPlayerRootQuery.graphql")

graphql`
  query videoPlayerRootQuery($video_clip_guid: uuid) {
    base_video_clip_connection(where: {video_clip_guid: {_eq: $video_clip_guid}}) {
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

interface Props {
  prepared: { preloadedQuery: PreloadedQuery<videoPlayerRootQuery> }
  routeData: RouteData;
  children: React.ReactNode;
}

const VideoPlayer: React.FC<Props> = (props) => {
  const { data: clientData } = useData('');
  const { routeData } = props;
  const data = usePreloadedQuery(preloadableRequest, props.prepared.preloadedQuery)?.base_video_clip_connection.edges.at(0)?.node
  const [viewerGuid, setViewerGuid] = useState<string | undefined>(undefined)

  const [commit, isInFlight] = useMutation(graphql`
  mutation videoPlayerInsertViewerMutation($object: base_viewer_insert_input = {}) {
    insert_base_viewer_one(object: $object) {
      viewer_guid
    }
  }
`);

  const onClick = () => {
    if (!data) { console.log('Data undefined'); console.log('data', data); return }
    if (!clientData?.IPv4) { console.log('clientData undefined'); console.log('clientData', clientData); return }
    if (viewerGuid) { console.log('Already submitted'); console.log('viewerGuid', viewerGuid); return }

    const feature: Feature = {
      id: uuidv4(),
      type: "Feature" as "Feature",
      geometry: {
        type: "Point" as "Point",
        coordinates: [
          50.4649,
          50.4649,
        ],
      },
      properties: {
        address: {
          country: "UK",
          city: "London"
        }
      },
    };

    const variables = {
      "object": {
        video_clip_guid: data.video_clip_guid,
        feature,
        ipaddr: clientData?.IPv4
      }
    }


    console.log('About to submit viewer data')
    commit({
      variables,
      onCompleted(res) {
        console.log(res)
        //@ts-ignore
        setViewerGuid(res.insert_base_viewer_one.viewer_guid)
      },
      onError(err) {
        console.error(err)
      },
    })

  }


  console.log('The following values are available to use')
  console.log('data', data)
  console.log('routeData', routeData)
  console.log('clientData', clientData)

  const printQRCode = () => {
    const svgElement = document.getElementById('qr-print'); // Get SVG element by id
    if (!svgElement) return;
    
    const printWindow = window.open('', '_blank'); // Open a new window
    printWindow?.document.write('<html><head><title>Print QR Code</title></head><body>');
    printWindow?.document.write(svgElement.outerHTML); // Write the SVG element to the new window
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1, // If you want the video to play as soon as it loads.
    },
  };


  const clip_url = 'https://www.youtube.com/watch?v=a3ICNMQW7Ok';
  const videoId = new URL(clip_url).searchParams.get("v") ?? '';
  
  return <div className={styles.videoPlayer}>
  <YouTube
    videoId={videoId!}
    opts={opts}
  />
  <button onClick={onClick}>Save viewer info</button>
  <button className={styles.print} onClick={printQRCode}>Print</button>
  <QRCodeSVG id='qr-print' value={`${window.location.href}`} className={styles.qrCode}/>
</div>
}

export default VideoPlayer;
