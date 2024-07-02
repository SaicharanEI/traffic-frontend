
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




