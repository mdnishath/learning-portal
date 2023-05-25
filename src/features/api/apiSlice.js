import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});
// creating apislice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    // //console.log(result);

    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }
    return result;
  },
  endpoints: (builder) => ({}),
});

// localStorage.setItem('auth',JSON.stringify({accessToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGxlYXJud2l0aHN1bWl0LmNvbSIsImlhdCI6MTY4MDM1NjQwNSwiZXhwIjoxNjgwMzYwMDA1LCJzdWIiOiIxIn0.uyA7X_X9DrrpuQW2mKnsvBExgFknJECgEyqnkFC4lbw",user:{email:"admin@learnwithsumit.com",role:"admin",name:"LWS Admin",id:1}}))
