import instance from "./Axios";

const api_uri = "http:/localhost:8181";
export const userList = () => instance.get(`${api_uri}/api/v1/user/list`);

// export const eventList = () => instance.get(`${api_uri}/events`);