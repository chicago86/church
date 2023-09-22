import { Auth } from "aws-amplify";
import { createClient } from 'graphql-ws';
import { Environment, Network, Observable, RecordSource, RequestParameters, Store, Variables } from "relay-runtime";
import { setVariables } from "./utils";

async function fetchGraphQL(text: string, variables?: Variables | undefined | null) {

  const url = ` ${process.env.REACT_APP_SERVER_PROTOCOL}://${process.env.REACT_APP_HASURA_FQDN}:${process.env.REACT_APP_HASURA_PORT}${process.env.REACT_APP_HASURA_PATH}`;

  var jwtToken;
  try {
    jwtToken = (await Auth.currentSession())?.getIdToken()?.getJwtToken();
  }
  catch (ex) {
    // No error here, non-authenticated users can access graphql server.
    jwtToken = null;
  }

  const response = await fetch(
    url,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...jwtToken && { "Authorization": "Bearer " + jwtToken },
      },
      body: JSON.stringify({
        query: text,
        variables,
      }),
    },
  );

  return response.json();
}

// Relay passes a "params" object with the query name and text. So we define a helper function
// to call our fetchGraphQL utility with params.text.
export async function fetchFn(params: any, variables?: Variables | undefined | null) {
  try {
    // Cache variables so that the application is aware which variables the data corresponds to.
    return fetchGraphQL(params.text, setVariables(params.name, variables));
  }
  catch (err) {
    console.error(err)
  }
}

const subscriptionsClient = createClient({
  url: `${process.env.REACT_APP_HASURA_SUBSCRIPTION_PROTOCOL}://${process.env.REACT_APP_HASURA_FQDN}:${process.env.REACT_APP_HASURA_PORT}${process.env.REACT_APP_HASURA_PATH}`,
  connectionParams: async () => {
    var jwtToken;
    try {
      jwtToken = (await Auth.currentSession())?.getIdToken()?.getJwtToken();
    }
    catch (ex) {
      // No subscriptions for non-authenticated users.
      jwtToken = null;
    }

    return {
      headers: {
        "Content-Type": "application/json",
        ...jwtToken && { "Authorization": "Bearer " + jwtToken },
      },
    };
  }
});

// Both fetch and subscribe can be handled through one implementation however we use different fetchFn due to return type issues.
// To understand why this function returns Observable<any>, please see: https://github.com/enisdenjo/graphql-ws/issues/316#issuecomment-1047605774
function fetchOrSubscribeFn(
  operation: RequestParameters,
  variables: Variables,
): Observable<any> {
  return Observable.create((sink) => {
    if (!operation.text) {
      return sink.error(new Error('Operation text cannot be empty'));
    }
    return subscriptionsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      sink,
    );
  });
}

// Export a singleton instance of Relay Environment configured with our network function:
export default new Environment({
  network: Network.create(fetchFn, fetchOrSubscribeFn),
  store: new Store(new RecordSource()),
});

//  TODO have a look if polling is required for automatic updates https://github.com/relay-tools/react-relay-network-modern/issues/40
