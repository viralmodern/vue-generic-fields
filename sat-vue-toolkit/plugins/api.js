export default {
    install(Vue, {axios}) {
        if (axios === undefined) {
            throw Error('api provider not defined')
        }
        axios.defaults.baseURL = process.env.VUE_APP_API_HOST;
        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
            // JWT
            // axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
            // Do something before request is sent
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        axios.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });

        Vue.prototype.$api = axios

    },
}
