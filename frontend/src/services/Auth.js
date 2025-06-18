import axios from "axios";

const api_url = "http://localhost:8081";

export const signIn = (data) => axios.post(`${api_url}/api/v1/auth/login`,data);
export const signUp = (data) => axios.post(`${api_url}/api/v1/auth/register`,data);