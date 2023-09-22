import { CognitoIdToken, CognitoUser } from "amazon-cognito-identity-js";
import { Auth, Hub } from 'aws-amplify';
import { useEffect, useState } from "react";

export interface UseAuthHookResponse {
  currentUser: CognitoUser | null;
  idToken: CognitoIdToken | null;
  hasuraClaims: JSON | null;
  x_hasura_principal_id: number | null;
  x_hasura_default_role: string;
  x_hasura_chat_p: string;
}

const useAuth = (): UseAuthHookResponse => {
  const [currentUser, setCurrentUser] = useState<CognitoUser | null>(null);
  const [idToken, setIdToken] = useState<CognitoIdToken | null>(null);
  const [hasuraClaims, setHasuraClaims] = useState<JSON | null>(null);
  const [x_hasura_default_role, set_x_hasura_default_role] = useState<string>('public');
  const [x_hasura_principal_id, set_x_hasura_principal_id] = useState<number | null>(null);
  const [x_hasura_chat_p, set_x_hasura_chat_p] = useState<string>('');
  useEffect(() => {
    const updateUser = async () => {
      try {
        setCurrentUser(await Auth.currentAuthenticatedUser());
        const idToken = (await Auth.currentSession()).getIdToken();
        setIdToken(idToken);

        // Claims require a lot of parsing and cast so do it here and return/export.
        const hasuraClaimsString = idToken?.payload["https://hasura.io/jwt/claims"];
        var claims = hasuraClaimsString && JSON.parse(hasuraClaimsString);
        claims && setHasuraClaims(claims);
        claims && set_x_hasura_default_role(String(claims['x-hasura-default-role']));
        claims && set_x_hasura_principal_id(Number(claims['x-hasura-principal-id']));
        claims && set_x_hasura_chat_p(String(claims['x-hasura-chat-p']));
      } catch {
        // currentAuthenticatedUser throws an Error if not signed in
        setCurrentUser(null);
        setIdToken(null);
      }
    };
    Hub.listen("auth", updateUser); // listen for login/signup events
    updateUser(); // check manually the first time because we won't get a Hub event
    return () => Hub.remove("auth", updateUser);
  }, []);
  return { currentUser, idToken, hasuraClaims, x_hasura_principal_id, x_hasura_default_role, x_hasura_chat_p };
};

export default useAuth;
