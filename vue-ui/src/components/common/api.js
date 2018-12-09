import { restclient } from "./restclient"
import apiConfig from './apiConfig'
import { join } from "path";

const authentication = {
    loginUrl: join(apiConfig.authentication_api_prefix, "login"),
    getLoginUserUrl: join(apiConfig.authentication_api_prefix, "me"),
    logoutUrl: join(apiConfig.authentication_api_prefix, "loginout"),
    login: function(username, password) {
        return new Promise((resolve, reject) => {         
            var url = this.loginUrl
            var data = {}
            data[apiConfig.login_field_name] = username
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

export default {
    authentication
}