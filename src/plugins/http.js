import axios from "axios";
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

http.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// http.interceptors.response.use(
//   response => {
//     if (true) {
//       return Promise.resolve(response);
//     } else {
//       return Promise.reject(response);
//     }
//   },
//   error => {

//   }
// );

export default {
  install(Vue) {
    Vue.prototype.$http = http;
  }
};
