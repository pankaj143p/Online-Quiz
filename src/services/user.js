// import api from "./baseUrl";

import axios from "axios";

const api = axios;

export const signup = async ({ name, email, password }) => {
  try {
    const { data } = await api.post("api/v1/auth/register", {
      name,
      email,
      password,
    },{
      withCredentials: true, 
    });
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const { data } = await api.post("/api/v1/auth/login", {
      email,
      password,
    },{
      withCredentials: true, 
    });

 
    return data;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.msg)
      throw new Error(error.response.data.msg);
    throw new Error(error.msg);
  }
};
