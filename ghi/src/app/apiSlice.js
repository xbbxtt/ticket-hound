import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const mlbApi = createApi({
    reducerPath: 'mlbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: 'include',
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
        authenticate: builder.query({
            query: () => ({
                url: '/api/auth/authenticate',
            }),
            providesTags: ['User'],
        }),
        editUser: builder.mutation({
            query: ({ ...editedUserData }) => ({
                url: '/api/auth/user/edit',
                method: 'PUT',
                body: editedUserData,
            }),
            invalidatesTags: ['User'],
        }),
        teamDetails: builder.query({
            query: (id) => ({
                url: `/api/teams/${id}`,
            }),
        }),
        gamesList: builder.query({
            query: ({ start_date, end_date, away_team, home_team }) => ({
                url: `/api/games?start_date=${start_date}&end_date=${end_date}
                    ${away_team ? `&away_team=${away_team}` : ''}
                    ${home_team ? `&home_team=${home_team}` : ''}`,
            }),
        }),
    }),
})

export const {
    useListMlbTeamsQuery,
    useSignupMutation,
    useSigninMutation,
    useAuthenticateQuery,
    useEditUserMutation,
    useSignoutMutation,
    useTeamDetailsQuery,
    useLazyTeamDetailsQuery,
    useGamesListQuery,
} = mlbApi
