export const environment = {
  production: true,
  // ...(isProd.environment ? { environment: 'production' } : { environment: 'development' }),
  environment: 'production',
  firebaseConfig: {
    apiKey: 'AIzaSyATAVCq14uE061qBJJx51_0oNfNHWOCI-U',
    authDomain: 'byrd-1498b.firebaseapp.com',
    databaseURL: 'https://byrd-1498b.firebaseio.com',
    projectId: 'byrd-1498b',
    storageBucket: 'byrd-1498b.appspot.com',
    messagingSenderId: '153751322878'
  },
  apiUrl: 'https://byrd-api.herokuapp.com/v1'
};
