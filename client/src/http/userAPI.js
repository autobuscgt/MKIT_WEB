import { $authHost,$host } from "./api";
import {jwtDecode} from 'jwt-decode'
export const registration = async(login,password)=>{
    const {data}= await $host.post('api/auth/registration',{login,password,role:'Student'})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}
export const Authorization = async(login,password)=>{
    const {data} = await $host.post('api/auth/login',{login,password})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}
export const check = async() => {
    const {data} = await $authHost.get('api/auth/check')
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}