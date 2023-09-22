import { Amplify } from "aws-amplify";

export function configureAmplify() {
  // Run the configuration function.
  Amplify.configure({
    Auth: {
      identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
      region: process.env.REACT_APP_COGNITO_REGION,
      identityPoolRegion:
        process.env.REACT_APP_COGNITO_IDENTITY_POOL_REGION,
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolWebClientId:
        process.env.REACT_APP_COGNITO_USER_POOL_WEB_CLIENT_ID,
      mandatorySignIn: process.env.REACT_APP_COGNITO_MANDATORY_SIGN_IN,
      authenticationFlowType:
        process.env.REACT_APP_COGNITO_AUTHENTICATION_FLOW_TYPE,
    },
  });
}