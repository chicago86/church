const { pathToRegexp } = require("path-to-regexp");

const cache$1 = {};
const cacheLimit$1 = 10000;
let cacheCount$1 = 0;

function compilePath$1(path, options) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {});
  if (pathCache[path]) return pathCache[path];
  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  const result = {
    regexp,
    keys,
  };

  if (cacheCount$1 < cacheLimit$1) {
    pathCache[path] = result;
    cacheCount$1++;
  }

  return result;
}

function matchPath(pathname, options) {
  if (options === void 0) {
    options = {};
  }

  if (typeof options === "string" || Array.isArray(options)) {
    options = {
      path: options,
    };
  }

  const _options = options;
  const { path } = _options;
  const _options$exact = _options.exact;
  const exact = _options$exact === void 0 ? false : _options$exact;
  const _options$strict = _options.strict;
  const strict = _options$strict === void 0 ? false : _options$strict;
  const _options$sensitive = _options.sensitive;
  const sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
  const paths = [].concat(path);
  return paths.reduce((matched, path) => {
    if (!path && path !== "") return null;
    if (matched) return matched;

    const _compilePath = compilePath$1(path, {
      end: exact,
      strict,
      sensitive,
    });
    const { regexp } = _compilePath;
    const { keys } = _compilePath;

    const match = regexp.exec(pathname);
    if (!match) return null;
    const url = match[0];
    const values = match.slice(1);
    const isExact = pathname === url;
    if (exact && !isExact) return null;
    return {
      path,
      // the path used to match
      url: path === "/" && url === "" ? "/" : url,
      // the matched portion of the URL
      isExact,
      // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index];
        return memo;
      }, {}),
    };
  }, null);
}

function matchRoutes(routes, pathname,
  /* not public API */
  branch) {
  if (branch === void 0) {
    branch = [];
  }

  routes.some((route) => {
    const match = route.path
      ? matchPath(pathname, route)
      : branch.length
        ? branch[branch.length - 1].match // use parent match
        : computeRootMatch(pathname); // use default "root" match

    if (match) {
      branch.push({
        route,
        match,
      });

      if (route.routes) {
        matchRoutes(route.routes, pathname, branch);
      }
    }

    return match;
  });
  return branch;
}

function computeRootMatch(pathname) {
  return {
    path: "/",
    url: "/",
    params: {},
    isExact: pathname === "/",
  };
}

/**
 * Match the current location to the corresponding route entry.
 */
function matchRoute(routes, location) {
  const matchedRoutes = matchRoutes(routes, location.pathname);
  if (!Array.isArray(matchedRoutes) || matchedRoutes.length === 0) {
    throw new Error(`No route for ${location.pathname}`);
  }
  return matchedRoutes;
}

/**
 * Load the data for the matched route, given the params extracted from the route
 */
function prepareMatches(matches) {
  return matches.map((match) => {
    const { route, match: matchData } = match;
    const prepared = route.prepare(matchData.params);
    const Component = route.component.get();
    if (Component == null) {
      route.component.load(); // eagerly load
    }
    return { component: route.component, prepared, routeData: matchData };
  });
}

export { matchRoutes, matchRoute, prepareMatches };