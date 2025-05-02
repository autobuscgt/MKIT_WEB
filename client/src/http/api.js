import axios from 'axios'

const base_URL = 'http://localhost:7000/'

 const $authHost = await axios.create({
    baseURL:base_URL
})
 const $host =  await axios.create({
    baseURL:base_URL
})

const authInterceptor = config =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
$authHost.interceptors.request.use(authInterceptor)
export{
    $authHost,
    $host
}