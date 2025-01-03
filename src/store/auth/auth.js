import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const apiUrl = process.env.REACT_APP_API_URL || import.meta.env.VITE_API_URL;
// console.log(apiUrl);

export const authApi = createApi({
  reducerPath: 'auth/api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/auth`,
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getMe: build.query({
      query: () => ({
        url: '/me',
      }),
    }),
    register: build.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: build.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
} = authApi;
