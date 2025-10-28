export interface FaceAttributes {
  age: number;
  gender: string;
  smile?: number;
  glasses?: string;
  facialHair?: any;
  emotion?: {
    happiness: number;
    neutral: number;
    sadness: number;
    anger: number;
    contempt: number;
    disgust: number;
    fear: number;
    surprise: number;
  };
}

export interface AnalysisResult {
  age: number;
  gender: string;
  vibeTag: string;
  attributes?: Partial<FaceAttributes>;
}

export interface ApiResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
  message?: string;
}

export enum AppState {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT',
  ERROR = 'ERROR',
}
