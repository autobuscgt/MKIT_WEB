import { $authHost } from "./api";

export const createHomework = async(lesson,description,groupId)=>{
    const {data}= await $authHost.post('api/homework/',{lesson,description,groupId})
    return data
}
export const fetchHomework = async (groupId,page,limit=8) => {
    const { data } = await $authHost.get('/api/homework', { 
        params: {
            groupId,     
            page,
            limit } 
    })
    return data
}