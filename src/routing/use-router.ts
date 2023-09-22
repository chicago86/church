import { useContext } from "react"
import useAuth from "../utils/use-auth"
import RoutingContext from "./routing-context"

export interface useRouterResponse {
  isChat: boolean
  isMain: boolean
  isProfile: boolean
  isLanding: boolean
  isFAQs: boolean
}

export const useRouter = (): useRouterResponse => {
  const router = useContext(RoutingContext)
  const location = router?.history.location
  var path: 'main' | 'chat' | 'profile' | 'landing' | 'faq' | undefined = undefined
  const { idToken } = useAuth()

  // Todo clean up these ifs
  if (!router || !location) path = 'main'
  else if (location.pathname === "/") path = 'main'
  else if (location.pathname.startsWith("/main")) path = 'main'
  else if (location.pathname.startsWith("/chat")) path = 'chat' // { path = idToken ? 'chat' : 'main' }
  else if (location.pathname === "/landing") path = 'landing'
  else if (location.pathname === "/faq") path = 'faq'
  else path = 'profile'

  return { isChat: path === 'chat', isMain: path === 'main', isProfile: path === 'profile', isLanding: path === 'landing', isFAQs: path === 'faq' }
}
