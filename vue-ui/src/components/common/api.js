import restclient from "./restclient"
import apiConfig from './apiConfig'
import { join } from "path";

export var authentication = {
    login: function(username, password) {
        return new Promise((resolve, reject) => {         
            var url = join(apiConfig.authentication_api_prefix, "login")
            var data = {}
            data[apiConfig.login_field_name] = username
            data["password"] = password
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
            var url = join(apiConfig.authentication_api_prefix, "logout")
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