// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  deviceUrl: "http://5.9.144.226:9030/deviceSimulator/",
  base_url: "http://5.9.144.226:9030/",
  live_url: "http://192.168.4.1/",
  hrUrl:"http://dev.hr.excellencetechnologies.in/hr/attendance/"
};
/*
 * In development mode, to ignoreyyyyyyyyyy zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
