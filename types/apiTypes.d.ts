export interface ApiHeaders {
  [key: string]: string;
  "Content-Type": string;
  Authorization: string;
  "App-Key"?: string; // TODO: à définir avec le back !
}

// Format de réponse du back en cas d'erreur !
export interface ErrorResponse {
  error: boolean;
  message: string;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
}
