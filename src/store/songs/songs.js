import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const songApi = createApi({
  reducerPath: 'api/songs',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/`,
    prepareHeaders: (headers) => {
      const token = window.localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getSongs: build.query({ query: () => 'songs' }),
    getFavorites: build.query({ query: () => 'favorites' }),
    getSong: build.query({
      query: (id) => ({
        url: `songs/${id}`,
      }),
    }),
    changeSong: build.mutation({
      query: (data) => ({
        url: '/save-chords',
        method: 'POST',
        body: data,
      }),
    }),
    changeFavorites: build.mutation({
      query: (data) => ({
        url: '/favorites',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSongsQuery,
  useLazyGetSongQuery,
  useGetSongQuery,
  useChangeSongMutation,
  useGetFavoritesQuery,
  useLazyGetFavoritesQuery,
  useChangeFavoritesMutation,
} = songApi;
