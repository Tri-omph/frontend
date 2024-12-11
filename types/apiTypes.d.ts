export interface ApiHeaders {
  [key: string]: string;
  "Content-Type": string;
  Authorization: string;
  "App-Key"?: string; // TODO: à définir avec le back !
}

export interface ErrorResponse {
  message: string;
  details?: string;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
}
