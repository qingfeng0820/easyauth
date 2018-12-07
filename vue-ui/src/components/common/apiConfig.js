
var baseURL = ''
if (process.env.NODE_ENV == 'development') {
    baseURL = 'http://localhost';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://api.123dailu.com/';
}

export default {
    authentication_api_prefix: "/api-auth",
    login_field_name: "phone",
    user_admin_pai_prefix: "/api",
    base_url: baseURL,
    request_timeout: 10000,
    lang_param: "lang",
}
