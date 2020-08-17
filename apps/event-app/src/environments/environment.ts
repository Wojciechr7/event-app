// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import firebaseConfig from '../firebase-config';

export const environment = {
  production: false,
  firebase: firebaseConfig,
  apiUrl: 'http://localhost:3333/api'
};
