import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mlbApi = createApi({
    reducerPath: 'mlbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
    }),
    tagTypes: ['teamsList', 'User'],
    endpoints: (builder) => ({
        listMlbTeams: builder.query({
            query: () => ({
                url: '/api/teams',
            }),
            providesTags: ['teamsList'],
        }),
        signup: builder.mutation({
            query: ({ ...userData }) => ({
                url: '/api/auth/signup',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
        signin: builder.mutation({
            query: ({ ...signinData }) => ({
                url: '/api/auth/signin',
                method: 'POST',
                body: signinData,
            }),
            invalidatesTags: ['User'],
        }),
        signout: builder.mutation({
            query: () => ({
                url: '/api/auth/signout',
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const { useListMlbTeamsQuery, useSignupMutation, useSigninMutation } =
    mlbApi
