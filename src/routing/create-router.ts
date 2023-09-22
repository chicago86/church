/* eslint-disable */
import { BrowserHistoryOptions, createBrowserHistory } from "history";
import { Routes } from "../routes";
import { matchRoute, matchRoutes, prepareMatches } from "./route-config-helper";

/**
 * A custom router built from the same primitives as react-router. Each object in `routes`
 * contains both a Component and a prepare() function that can preload data for the component.
 * The router watches for changes to the current location via the `history` package, maps the
 * location to the corresponding route entry, and then preloads the code and data for the route.
 */
export default function createRouter(routes: Routes, options?: BrowserHistoryOptions) {
  // Initialize history
  const history = createBrowserHistory(options);

  // Find the initial match and prepare it
  const initialMatches = matchRoute(routes, history.location);
  const initialEntries = prepareMatches(initialMatches);
  let currentEntry = {
    location: history.location,
    entries: initialEntries,
  };

  // maintain a set of subscribers to the active entry
  let nextId = 0;
  const subscribers = new Map();

  // Listen for location changes, match to the route entry, prepare the entry,
  // and notify subscribers. Note that this pattern ensures that data-loading
  // occurs *outside* of - and *before* - rendering.
  const cleanup = history.listen((history) => {
    if (history.location.pathname === currentEntry.location.pathname) {
      return;
    }
    const matches = matchRoute(routes, history.location);
    const entries = prepareMatches(matches);
    const nextEntry = {
      location: history.location,
      entries,
    };
    currentEntry = nextEntry;
    subscribers.forEach((cb) => cb(nextEntry));
  });

  // The actual object that will be passed on the RoutingContext.
  const context = {
    history,
    get() {
      return currentEntry;
    },
    preloadCode(pathname: string) {
      // preload just the code for a route, without storing the result
      const matches = matchRoutes(routes, pathname);
      matches.forEach((branch: any) => branch.route.component.load());
    },
    preload(pathname: string) {
      // preload the code and data for a route, without storing the result
      const matches = matchRoutes(routes, pathname);
      prepareMatches(matches);
    },
    subscribe(cb: Function) {
      const id = nextId++;
      const dispose = () => {
        subscribers.delete(id);
      };
      subscribers.set(id, cb);
      return dispose;
    },
  };

  // Return both the context object and a cleanup function
  return { cleanup, context };
}