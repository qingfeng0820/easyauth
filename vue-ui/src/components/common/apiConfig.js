
var baseURL = ''
baseURL = 'http://localhost';
if (process.env.NODE_ENV == 'development') {
    baseURL = 'http://localhost';
}

export default {
    authentication_api_prefix: "/api-auth",
    login_field_name: "phone",
    user_admin_pai_prefix: "/api",
    base_url: baseURL,
    request_timeout: 10000,
    lang_param: "lang",
    default_lang_code: "zh-hans",
}
