export interface RouteValue {
  [key: string]: string
}
export interface Route {
  _root: string,
  paths?: RouteValue[],
  children?: Route[]
}
export interface Routes {
  src: Route,
  html: Route,
  css: Route,
  assets: Route
}
