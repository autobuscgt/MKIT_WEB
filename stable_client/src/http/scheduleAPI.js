import { $authHost } from "./api";

export const createSchedule = async (data) => {
  const { data: response } = await $authHost.post('api/schedule/add', data)
  return response
}
export const fetchSchedule = async (groupId) => {
  const { data } = await $authHost.get('/api/schedule', { 
      params: { groupId } 
  })
  return data
}

export const fetchGroupSchedule = async (groupId) => {
  const { data } = await $authHost.get(`api/schedule?group=${groupId}`);
  return data;
};

// export const deleteSchedule = async()=>{
//     const {data} = await $authHost.delete('api/schedule/:id')
// }
// export const updateSchedule = async()=>{
//     const {data} = await $authHost.delete('api/schedule/:id')
// }