/// <reference types="react-scripts" />
/*
declare module 'babel-plugin-relay/macro' {
	export { graphql } from 'react-relay'
}
*/

declare module "babel-plugin-relay/macro" {
	export { graphql as default } from "react-relay";
}

declare module '*.ttf';