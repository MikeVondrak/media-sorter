import { Routes } from "./models/routes.model";

export const routes: Routes = {
  // NOTE: set app target as main.js in package.json
  src: {
    _root: './src/'
  },
  html: {
    _root: './html/',
    paths: [
      { 'main': 'main.html' }
    ],
    children: [
      {
        _root: 'pages',
        paths: [
          { scan: 'scan.html'},
          { results: 'results.html'},
        ]
      }
    ],
  },
  css: {
    _root: './css/'
  },
  assets: {
    _root: './assets/'
  }
  
}