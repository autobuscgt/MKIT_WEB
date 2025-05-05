import { $authHost } from "./api";
export const fetchGroups = async () => {
    const { data } = await $authHost.get('api/groups/');
    return data;
  };
  export const createGroups = async (group_code, speciality, image) => {
    const { data } = await $authHost.post('api/groups/', {
      group_code: group_code,
      speciality: speciality,
      image: image
    });
    return data;
  };