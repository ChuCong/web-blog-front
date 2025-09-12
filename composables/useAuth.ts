import { authStore } from "~/store/auth";
export function useAuth() {
    const auth_store = authStore()

    const login = async (payload: any) => {
        let data = await auth_store.login(payload);
        if(data){
            return data;
        }
    };
    const loginByGoogle = async (payload :any) => {
        let data = await auth_store.loginByGoogle(payload);
        if(data){
            return data;
        }
    };
    const register = async ( payload:any) => {
        let data = await auth_store.register(payload);
        if(data){
            return data;
        }
    };
    const forgetPassword = async (payload: any) => {
        let data = await auth_store.forgetPassword(payload);
        if(data){
            return data;
        }
    };
    return{
        login,
        forgetPassword,
        register,
        loginByGoogle
    }
   
}