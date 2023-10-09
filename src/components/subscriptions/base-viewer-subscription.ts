import graphql from "babel-plugin-relay/macro"
import { useMemo } from "react"
import { useSubscription } from 'react-relay'
 
export default function BaseViewerSubscription() {
//modified at is time
  const subscription = graphql`
    subscription baseViewerSubscription {
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
  const config = useMemo(() => ({
    subscription,
    variables: {},
    onNext: () => {
      // The suggested method, in which the subscription loads all data without any subsequent refetching, failed 
      // despite the fact that all the fragments were spread as advised within the subscription. 
      // Although the Relay store updated, it introduced an extra client:local:* for this subscription, while the original client:root received no updates, 
      // even though the root query text and the subscription text were identical.
      // As a result, the only currently functional solution that allows to re-render the Chat UI is to refetch the homeRootQuery itself using this subscription as a mere trigger.



      // TODO use fragment conception istead
      // state.refetch({}, 'network-only')
    },
    onError: (error: Error) => console.log(`Subscription error occured:`, error)
  }), []);

  return useSubscription(config)
}