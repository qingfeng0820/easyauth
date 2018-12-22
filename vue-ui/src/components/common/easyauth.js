import { restclient } from "./restclient"
import projConfig from '../config'
import { join } from "path"

var baseURL = ''

if (projConfig.easyauthBaseURL) {
    baseURL = projConfig.easyauthBaseURL
} else if (projConfig.backendBaseURL) {
    baseURL = projConfig.backendBaseURL
}

const config = {
    base_url: baseURL,
    authentication_api_prefix: '/api-auth',
    user_admin_api_prefix: '/api',
    lang_param: "lang",
}

const authentication = {
    loginUrl: config.base_url + join(config.authentication_api_prefix, "login"),
    getLoginUserUrl: config.base_url + join(config.authentication_api_prefix, "me"),
    changePasswordUrl: config.base_url + join(config.authentication_api_prefix, "password/change"),
    logoutUrl: config.base_url + join(config.authentication_api_prefix, "loginout"),
    login: function(username, password) {
        return new Promise((resolve, reject) => {         
            var url = this.loginUrl
            var data = {}
            data[projConfig.loginFieldName] = username
            data["password"] = password
            restclient.postJson(url, data)       
            .then(logRes => {
                this.me().then(res => {
                    resolve(logRes); 
                })
                .catch(err => {
                    reject(err) 
                })                  
            })        
            .catch(err => {      
                reject(err)        
            })    
        });
    },
    me: function() {
        return new Promise((resolve, reject) => {         
            var url = this.getLoginUserUrl
            restclient.get(url)
            .then(res => {            
                resolve(res);        
            })        
            .catch(err => {            
                reject(err)        
            })    
        });
    },
    checkme: function() {
        return new Promise((resolve, reject) => {         
            var url = [this.getLoginUserUrl, "checkme=true"].join("?")
            restclient.get(url)
            .then(res => {            
                resolve(res);        
            })        
            .catch(err => {            
                reject(err)        
            })    
        });
    },
    changePassword: function(password, new_password) {
        return new Promise((resolve, reject) => {         
            var url = this.changePasswordUrl
            var data = {}
            data['password'] = password
            data["new_password"] = new_password
            restclient.postJson(url, data)
            .then(res => {            
                resolve(res);        
            })        
            .catch(err => {            
                reject(err)        
            })    
        }); 
    },
    logout: function() {
        return new Promise((resolve, reject) => {         
            var url = this.logoutUrl
            restclient.post(url)
            .then(res => {            
                resolve(res);        
            })        
            .catch(err => {            
                reject(err)        
            })    
        });
    }
}

const useradmin = {
    usersAdminUrl: config.base_url + join(config.user_admin_api_prefix, "users"),
    rolesAdminUrl: config.base_url + join(config.user_admin_api_prefix, "groups"),
    permissionsAdminUrl: config.base_url + join(config.user_admin_api_prefix, "permissions"),
    getUsers() {
        return new Promise((resolve, reject) => {         
            var url = this.usersAdminUrl
            restclient.get(url)
            .then(res => {            
                resolve(res);        
            })        
            .catch(err => {            
                reject(err)        
            })    
        });
    },
    getRoles(params) {
        return new Promise((resolve, reject) => {         
            var url = this.rolesAdminUrl
            restclient.get(url, params)
            .then(res => {            
                resolve(res);        
            })        
            .catch(err => {            
                reject(err)        
            })    
        });       
    },
    createRole(newRole) {
        return new Promise((resolve, reject) => {         
            var url = this.rolesAdminUrl
            if (newRole.permissions) {
                var permissions = []
                newRole.permissions.forEach(element => {
                    permissions.push(element.id)
                });
                newRole.permissions = permissions
            }
            restclient.postJson(url, newRole)
            .then(res => {            
                resolve(res);        
            })        
            .catch(err => {            
                reject(err)        
            })    
        });
    },
    editRole(roleId, changeProps) {
        return new Promise((resolve, reject) => {         
            var url = [this.rolesAdminUrl, roleId.toString()].join("/")
            if (changeProps.permissions) {
                var permissions = []
                changeProps.permissions.forEach(element => {
                    permissions.push(element.id)
                });
                changeProps.permissions = permissions
            }
            restclient.patchJson(url, changeProps)
            .then(res => {            
                resolve(res);        
            })        
            .catch(err => {            
                reject(err)        
            })    
        });
    },
    deleteRole(roleId) {
        return new Promise((resolve, reject) => {         
            var url = [this.rolesAdminUrl, roleId.toString()].join("/")
            restclient.del(url)
            .then(res => {            
                resolve(res);        
            })        
            .catch(err => {            
                reject(err)        
            })    
        });
    },
    getPermissions() {
        return new Promise((resolve, reject) => {         
            var url = this.permissionsAdminUrl + '?page_size=100000'
            restclient.get(url)
            .then(res => {            
                resolve(res);        
            })        
            .catch(err => {            
                reject(err)        
            })    
        });       
    },
}

export default {
    config,
    authentication,
    useradmin,
}