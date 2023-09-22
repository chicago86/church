import { BrowserHistory, Location } from "history"
import React from "react"

// Uses the custom router setup to define a router instanace that we can pass through context
const RoutingContext = React.createContext<{
  history: BrowserHistory;
  get(): { location: Location; entries: any; };
  preloadCode(pathname: string): void;
  preload(pathname: string): void;
  subscribe(cb: Function): () => void;
} | null>(null)

// A context instance for our custom router
export default RoutingContext
