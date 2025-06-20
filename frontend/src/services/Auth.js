import instance from "./Axios";

export const signIn = (data) => instance.post(`/api/v1/auth/login`, data);
export const signUp = (data) => instance.post(`/api/v1/auth/register`, data);