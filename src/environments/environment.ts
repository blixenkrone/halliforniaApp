// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environment: 'development',
  firebaseConfig: {
    apiKey: 'AIzaSyDZw30D6GVrqkaGtLJ0RSYFBU0vgvrB5Vo',
    authDomain: 'byrd-development.firebaseapp.com',
    databaseURL: 'https://byrd-development.firebaseio.com',
    projectId: 'byrd-development',
    storageBucket: 'byrd-development',
    messagingSenderId: '743878726887'
  },
  apiUrl: 'https://dev-api.byrd.news/v1'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
