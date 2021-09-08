import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { EventEmitter } from '@App/@components';

class AuthService extends EventEmitter {

    LoginServiceUrl = "http://localhost:8000/auth/login";
    RegisterServiceUrl = "http://localhost:8000/auth/register";
    GetUserServiceUrl = "http://localhost:8000/auth/get_user";

    RemoveProfileImageServiceUrl = "http://localhost:8000/update_profile/remove_profile_image";
    RemoveBackgroundImageServiceUrl = "http://localhost:8000/update_profile/remove_background_image";

    ChangeThemeModeServiceUrl = "http://localhost:8000/update_profile/change_theme_mode";

    init()
    {
        this.setInterceptors();
        this.handleAuthentication(); // Giriş yapılmış mı kontrol et
    }

    setInterceptors = () => {
        Axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise(() => {
                // if you ever get an unauthorized response, logout the user
                this.emit('onAutoLogout', 'Server is unavaible.');
                this.setAuthorizationToken(null);
                throw err;
            });
        });
    };

    handleAuthentication = () => {
        const access_token = window.localStorage.getItem('user_access_token');
        if (!access_token){
            return;
        }

        if (this.isAuthTokenExpired(access_token))// Token süre kontrolü
        {
            this.setAuthorizationToken(access_token);
            this.emit('onAutoLogin', true);
        }
        else{
            this.setAuthorizationToken(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    Login = (username_or_email, password) => {
        return new Promise((resolve, reject) => {
            Axios.post(this.LoginServiceUrl, { username_or_email, password })
            .then(res => {
                if (res.data.status)
                {
                    window.localStorage.setItem('user_access_token', res.data.token);
                    this.setAuthorizationToken(res.data.token);
                    resolve(res.data.message);
                }
                else
                {
                    reject(res.data.message);
                }
            });
        });
    };

    GetUser = () => {
        return new Promise((resolve, reject) => {
            Axios.post(this.GetUserServiceUrl)
            .then(res => {
                if (res.data.status)
                {
                    this.setAuthorizationToken(res.data.token);
                    resolve(res.data.User);
                }
                else
                {
                    this.setAuthorizationToken(null);
                    reject(res.data.message);
                }
            });
        });
    };

    Register = (data) => {
        return new Promise((resolve, reject) => {
            Axios.post(this.RegisterServiceUrl, data)
            .then(res => {
                if (res.data.status)
                {
                    this.setAuthorizationToken(res.data.token);
                    resolve(res.data);
                }
                else
                {
                    reject(res.data.message);
                }
            });
        });
    };

    LogOut = () => {
        window.localStorage.removeItem("user_access_token");
        this.setAuthorizationToken(null);
    };

    isAuthTokenExpired = access_token => {
        if (!access_token)
        {
            return false;
        }

        try{
            const decoded = jwtDecode<any>(access_token);
            const currentTime = Date.now() / 1000;
            if ( decoded.exp < currentTime )
            {
                console.warn('access token expired');
                return false;
            }
            else
            {
                return true;
            }
        }catch(err){    
            return false;
        }
    };

    setAuthorizationToken = access_token => {
        if (access_token)
        {
            //localStorage.setItem('user_access_token', access_token);
            Axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
            Axios.interceptors.request.use(function (config) {
                config.headers.Authorization =  'Bearer ' + access_token;
                return config;
            });
        }
        else
        {
            //localStorage.removeItem('user_access_token');
            delete Axios.defaults.headers.common['Authorization'];
        }
    };

    getAuthorizationToken = () => {
        return 'Bearer ' + window.localStorage.getItem("user_access_token");
    }

    removeProfileImage = () => {
        return new Promise((resolve, reject) => {
            Axios.delete(this.RemoveProfileImageServiceUrl)
            .then(res => {
                if (res.data.status)
                {
                    resolve(res.data);
                }
                else
                {
                    reject(res.data.message);
                }
            });
        });
    }

    removeBackgroundImage = () => {
        return new Promise((resolve, reject) => {
            Axios.delete(this.RemoveBackgroundImageServiceUrl)
            .then(res => {
                if (res.data.status)
                {
                    resolve(res.data);
                }
                else
                {
                    reject(res.data.message);
                }
            });
        });
    }

    changeThemeMode = (mode) => {
        return new Promise((resolve, reject) => {
            Axios.post(this.ChangeThemeModeServiceUrl, {mode: mode})
            .then(res => {
                if (res.data.status)
                {
                    resolve(res.data);
                }
                else
                {
                    reject(res.data.message);
                }
            });
        });
    }
}

const instance = new AuthService();

export default instance;
