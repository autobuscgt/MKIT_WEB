import { $authHost, $host} from "./api";

export const createEvents = async(name,image, description, day_of_week)=>{
    const {data}= await $authHost.post('api/events/',{name,image, description, day_of_week})
    return data
}
export const fetchEvents = async(page=1,limit=8)=>{
    const {data} = await $host.get('api/events/',{params:{
      page,
      limit
    }})
    console.log(data)
    return data
}
export const deleteEventAPI = async (id) => {
    const { data } = await $authHost.delete('api/events/' + id)
    return data
  }

export const updateEventAPI = async (id, data) => {
  const { data: response } = await $authHost.put(`api/events/${id}`, data);
  return response;
};
export const fetchEventById = async(id) => {
  const { data } = await $authHost.get(`api/events/${id}`);
  return data;
}