#Angular 1 & 2 !

Simple starter example that shows you how to mix Angular 2 app with Angular 1. For the purpose of this demo, I have used John Papa's Angular 2 app and just a base Angular 1 app with different states.

##Getting Started

Before getting started make sure you have the latest version of node, bower, gulp globally installed.

1. Clone this repo

1. Run `npm install`

1. Run the build version by command `gulp serve-dev` and prod version by `gulp serve-prod`

1. The dev version should serve the app and watch for changes in typescript and recompile project.

Optional:

Run the TypeScript compiler and watch for changes `npm run tsc`

## Running Node and NPM

- [on Windows](http://www.johnpapa.net/tips-for-running-node-and-npm-on-windows/)
- [on OSX](http://www.johnpapa.net/how-to-use-npm-global-without-sudo-on-osx/)

##Notes

With the specific version of Angular 2, it is unclear as to how we can read an attribute from a component. Will need to check for future versions.

This sample intentionally uses precise versions of Angular 2 and SystemJS so new versions do not break it.

It would be ideal to use ng-Router for both Angular 1 & 2 but since it is still in development and the API is changing continuosly, I have used UI-Router for Angular 1 and ng-Router for Angular 2. So refreshing the browser when on a deep link (a named route), will get a 404 or nothing. Simply go back to the root /.
