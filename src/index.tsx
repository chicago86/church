import { CognitoUser } from "amazon-cognito-identity-js"
import { Auth } from "aws-amplify"
import * as ReactDOM from "react-dom/client"
import { RelayEnvironmentProvider } from "react-relay/hooks"
import './css/resets.scss';
import RelayEnvironment from "./relay-environment"
import routes from "./routes"
import createRouter from "./routing/create-router"
import RouterRenderer from "./routing/route-renderer"
import RoutingContext from "./routing/routing-context"
import { configureAmplify } from "./utils/amplify-configure"

configureAmplify()

// Uses the custom router setup to define a router instanace that we can pass through context
const router = createRouter(routes)

var render = () => ReactDOM.createRoot(document.getElementById("root")!).render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <RoutingContext.Provider value={router.context}>
      {/* Render the active route */}
      <RouterRenderer />
    </RoutingContext.Provider>
  </RelayEnvironmentProvider>
)

// The code below allows to synchronously check later if the user has been authenticated
Auth.currentAuthenticatedUser()
  .then(
    (user: CognitoUser) => {
      localStorage.setItem("authenticated", `${!!user}`)
      if (!!user) {
        localStorage.setItem("p_tguid", `${user.getUsername()}`)
        localStorage.setItem("p_tguid_updated_at", Date.now().toString())
      }
    },
    () => { localStorage.setItem("authenticated", 'false') }
  )
  .finally(() => render())