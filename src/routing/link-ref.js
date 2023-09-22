import React, { forwardRef } from "react";
import RoutingContext from "./routing-context";

const { useCallback, useContext } = React;

/**
 * An alternative to react-router's Link component that works with
 * our custom RoutingContext.
 * TODO make a single link component out of Link and LinkRef
 * This component has more features for example it allows to process props.onClick
 */
const LinkRef = forwardRef(function Link(props, ref) {
  const router = useContext(RoutingContext);

  // When the user clicks, change route
  const changeRoute = useCallback(
    (event) => {
      props.onClick && props.onClick();
      event.preventDefault();
      router.history.push(props.to);
    },
    [props.to, router],
  );

  // Callback to preload just the code for the route:
  // we pass this to onMouseEnter, which is a weaker signal
  // that the user *may* navigate to the route.
  const preloadRouteCode = useCallback(() => {
    router.preloadCode(props.to);
  }, [props.to, router]);

  // Callback to preload the code and data for the route:
  // we pass this to onMouseDown, since this is a stronger
  // signal that the user will likely complete the navigation
  const preloadRoute = useCallback(() => {
    router.preload(props.to);
  }, [props.to, router]);

  return (
    <a
      href={props.to}
      onClick={changeRoute}
      onMouseEnter={preloadRouteCode}
      onMouseDown={preloadRoute}
      className={props.className}
      ref={ref}
    >
      {props.children}
    </a>
  );
}
)

export default LinkRef