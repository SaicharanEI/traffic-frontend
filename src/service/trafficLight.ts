import axios from "axios";
const url = import.meta.env.VITE_API_BASE_URL;
import { showToast } from "../utils/Toast";
export const fetchLights = async () => {
  try {
    const response = await axios.get(`${url}traffic-light`);
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message, error);
  }
};

export const addLight = async (light: any) => {
  try {
    const response = await axios.post(`${url}traffic-light`, light);
    return response.data;
  } catch (error: any) {
    showToast("error", error.response?.data?.message);
  }
};

export const updateLightDetails = async (light: any) => {
  try {
    const response = await axios.put(`${url}traffic-light/${light.id}`, light);
    return response.data;
  } catch (error: any) {
    console.error(error);
    showToast("error", error.response?.data?.message);
  }
};

export const fetchLightById = async (id: number) => {
  try {
    const response = await axios.get(`${url}traffic-light/${id}`);

    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};

export const deleteLightById = async (id: number) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/traffic-light/${id}`
    );
    return response.data;
  } catch (error: any) {
    showToast("error", error.response.data.message);
  }
};

export const deleteScheduleById = async (id: number) => {
  try {
    const response = await axios.delete(`${url}traffic-light/schedule/${id}`);
    return response.data;
  } catch (error: any) {
    showToast("error", error.response.data.message);
  }
};

interface changeModeProps {
  id: number;
  mode: boolean;
  color: string;
}

export const changeAutomaticMode = async ({
  id,
  mode,
  color,
}: changeModeProps) => {
  try {
    const response = await axios.put(`${url}traffic-light/${id}/change-mode`, {
      mode,
      color,
    });
    return response.data;
  } catch (error: any) {
    showToast("error", error.response.data.message);
  }
};
