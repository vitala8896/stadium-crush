import Axios from 'axios';
let queryAPIURL=process.env.REACT_APP_BASE_URL;
let upDownAPIURL=process.env.REACT_APP_UPDOWN_URL;
let secrets=process.env.secrets;
if (secrets===undefined) {
  console.log("Cannot get secrets.")
} else {
  console.log("Found secrets"+secrets)
}
if (queryAPIURL===undefined) {
  console.log("Cannot get query API URL from env var BASE_URL. ");
  queryAPIURL="https://hcl33aj94h.execute-api.us-east-1.amazonaws.com/prod";
//  queryAPIURL="https://5onxqzfhwe.execute-api.us-east-1.amazonaws.com/prod";
}
if (upDownAPIURL===undefined) {
  upDownAPIURL="https://amct54ppa4.execute-api.us-east-1.amazonaws.com/prod";
}
const queryAPI = Axios.create({
  baseURL: queryAPIURL,
  headers: { Accept: 'application/json' }
});
const upDownAPI = Axios.create({
  baseURL: upDownAPIURL,
  headers: { Accept: 'application/json' }
})

queryAPI.defaults.headers.get['Content-Type'] = 'application/json';
upDownAPI.defaults.headers.get['Content-Type'] = 'application/json';

export { queryAPI,upDownAPI };
