// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BASE_URL: 'http://localhost:5000/api',
  FOODS_URL: `http://localhost:5000/api/foods`,
  FOODS_TAGS_URL: `http://localhost:5000/api/foods/tags`,
  FOODS_BY_TAGS_URL: `http://localhost:5000/api/foods/tags/`,
  FOODS_SEARCH_URL: `http://localhost:5000/api/foods/search/`,
  FOODS_BY_ID: `http://localhost:5000/api/foods/`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
