export interface ProjectContext {
  projectType: string;
  constructionType: string;
  municipality: string;
  zoning: string;
  buildingHeight: number;
  distanceToBoundary: number;
  grossFloorArea: number;
  hasElevator: boolean;
  isAccessible: boolean;
  fireClass: string;
}

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export enum LoadingState {
  IDLE = "IDLE",
  LOADING = "LOADING",
  ANALYZING = "ANALYZING",
}