import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TrafficLightSchedule {
  id: number | undefined;
  timePeriod: string;
  startTime: string;
  endTime: string;
  redDuration?: number;
  yellowDuration?: number;
  greenDuration?: number;
}

export interface TrafficLight {
  id: number;
  name: string;
  location: string;
  schedules: TrafficLightSchedule[];
  currentColor: string;
}

interface TrafficLightsState {
  trafficLights: TrafficLight[];
}

const initialState: TrafficLightsState = {
  trafficLights: [],
};

const trafficLightSlice = createSlice({
  name: 'trafficLights',
  initialState,
  reducers: {
    addTrafficLight: (state, action: PayloadAction<TrafficLight>) => {
      state.trafficLights.push(action.payload);
    },
    deleteTrafficLight: (state, action: PayloadAction<number>) => {
      state.trafficLights = state.trafficLights.filter(
        (light) => light.id !== action.payload
      );
    },
    updateTrafficLightColor: (state, action: PayloadAction<{ id: number; color: string }>) => {
      const { id, color } = action.payload;
      const trafficLight = state.trafficLights.find((light) => light.id === id);
      if (trafficLight) {
        trafficLight.currentColor = color; // Update currentColor property
      }
    },
    updateTrafficLight: (state, action: PayloadAction<TrafficLight>) => {
      const index = state.trafficLights.findIndex((light) => light.id === action.payload.id);
      if (index !== -1) {
        state.trafficLights[index] = action.payload;
      }
    },
  },
});

export const { addTrafficLight, deleteTrafficLight, updateTrafficLightColor, updateTrafficLight } = trafficLightSlice.actions;

export default trafficLightSlice.reducer;
