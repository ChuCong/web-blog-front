import { defineStore } from 'pinia';
import { useMyFetch } from "~/composables/useMyFetch";
import JwtService from "~/services/jwt.service";

export const LOGIN = '/auth/login';
export const LOGIN_BY_GOOGLE = '/auth/google';
export const FORGET_PASSWORD = '/auth/forgetPassword';
export const REGISTER = '/auth/register';
export const DETAIL_USER = '/account';
export const UPDATE_USER = '/account';
export const UPDATE_PASSWORD = '/account/password';
import { messageError } from '~/common/message.service';

interface Auth {
    is_authenticated: boolean;
    user: any;
    is_active: boolean;
    has_permission: boolean
}

export const authStore = defineStore('auth', {
    state: (): Auth => {
        return {
            user: null,
            is_authenticated: false,
            is_active: false,
            has_permission: true
        };
    },
    actions: {
        setAuthenticate(status: any) {
            this.is_authenticated = status;
        },
        setHasPermission(status: any) {
            this.has_permission = status;
        },

        async login(payload: any) {
            return await useMyFetch(LOGIN, {
                method: 'POST',
                body: payload
            }).then((data: any) => {
                if (data && data.status) {
                    this.is_authenticated = true
                    JwtService.saveToken(data.data.tokens.accessToken);
                    JwtService.saveUser(data.data.info.displayName);
                }
                return data
            })
        },
        async loginByGoogle(payload: any) {
            return await useMyFetch(LOGIN_BY_GOOGLE, {
                method: 'POST',
                body: payload
            }).then((data: any) => {
                if (data && data.status && data.data.status) {
                    this.is_authenticated = true
                    console.log('data login', data.data)
                    JwtService.saveEmail(data.data.data.email)
                    JwtService.saveToken(data.data.access_token)
                    JwtService.saveUser(data.data.data.full_name)
                    if (data.data.data.avatar) {
                        JwtService.saveUserAvatar(data.data.data.avatar)
                    }
                }
                return data
            })
        },
        async register(payload: any) {
            const data: any = await useMyFetch(REGISTER, {
                method: 'POST',
                body: payload
            })
            return data
        },
        async forgetPassword(payload: any) {
            return await useMyFetch(FORGET_PASSWORD, {
                method: 'POST',
                body: payload
            })
            .then((data: any) => {
                if (data && data.status) {
                  return data
                }
            })
           
        },
        async getDetailUser() {
            const data: any = await useMyFetch(DETAIL_USER)
            if (data && data.status) {
                this.user = data.data
                return this.user;
            }
        },
        async updateUser(payload: any) {
            return await useMyFetch(UPDATE_USER,{
                 method: 'POST',
                body: payload
            }).then((data: any) => {
                if (data && data.status) {
                  return data
                }
            })
        },
        async updatePassword(payload: any) {
            return await useMyFetch(UPDATE_PASSWORD,{
                 method: 'POST',
                body: payload
            }).then((data: any) => {
                if (data && data.status) {
                  return data
                }
            })
        },
   
    },
});
