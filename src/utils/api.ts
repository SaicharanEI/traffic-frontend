import axios from "axios";
import Toast from "./Toast";
export const fetchLights = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}traffic-light`
    );

    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export const addLight = async (light: any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}traffic-light`,
      light
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message,
      });
  }
};

export const updateLightDetails = async (light: any) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}traffic-light/${light.id}`,
      light
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
      Toast.fire({
        icon: "error",
        title: error.response?.data?.message,
      });
  }
};

export const fetchLightById = async (id: number) => {
  try{
    const response = await axios.get(
    `${import.meta.env.VITE_API_BASE_URL}traffic-light/${id}`
  );

  return response.data;
}catch (error: any) {
      console.log(error.response.data.message)
  }
};

export const deleteLightById = async (id: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/traffic-light/${id}`
    );
    return response.data;
  } catch (error: any) {
    Toast.fire({
      icon: "error",
      title: error.response.data.message,
    });
  }
};

export const deleteScheduleById = async (id: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}traffic-light/schedule/${id}`
    );

    return response.data;
  } catch (error: any) {
    Toast.fire({
      icon: "error",
      title: error.response.data.message,
    });
  }
};

interface changeModeProps {
  id: number;
  mode: boolean;
  color: string
}

export const changeAutomaticMode = async ({ id, mode, color }: changeModeProps) => {
  console.log({id, mode, color})
  
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}traffic-light/${id}/change-mode`, {mode, color}
    );
    return response.data;
  } catch (error: any) {
    Toast.fire({
      icon: "error",
      title: error.response.data.message,
    });
  }
};
