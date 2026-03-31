import type { APIClient } from "./interface";
import { APIClientAxios } from "./client-axios";

export const apiClient: APIClient = new APIClientAxios({baseURL: import.meta.env.VITE_API_BASE})

