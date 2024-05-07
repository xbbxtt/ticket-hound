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
        deleteUser: builder.mutation ({
            query:() => ({
                url: "/api/auth/user/delete",
                method: "DELETE",
            }),
            invalidatesTags: ["User"]
        }),
        teamDetails: builder.query({
            query: (id) => ({
                url: `/api/teams/${id}`,
            }),
        }),
        gamesList: builder.query({
            query: ({ startDate, endDate, awayTeam, homeTeam }) => {
                if (!awayTeam && !homeTeam) {
                    return {
                        url: `/api/games?start_date=${startDate}&end_date=${endDate}`,
                    }
                } else if (!awayTeam) {
                    return {
                        url: `/api/games?start_date=${startDate}&end_date=${endDate}&home_team=${homeTeam}`,
                    }
                } else if (!homeTeam) {
                    return {
                        url: `/api/games?start_date=${startDate}&end_date=${endDate}&away_team=${awayTeam}`,
                    }
                } else {
                    return {
                        url: `/api/games?start_date=${startDate}&end_date=${endDate}&away_team=${awayTeam}&home_team=${homeTeam}`,
                    }
                }
            },
        }),
        gameDetails: builder.query({
            query: (id) => ({
                url: `/api/games/${id}`,
            }),
        }),
        seatgeekTickets: builder.query({
            query: ({ awayTeam, homeTeam, dateTime }) => ({
                url: `/api/tickets/seatgeek?away_team=${awayTeam}&home_team=${homeTeam}&date_time=${dateTime}`,
            }),
        }),
        vividseatsTickets: builder.query({
            query: ({ awayTeam, homeTeam, dateTime }) => ({
                url: `/api/tickets/vividseats?away_team=${awayTeam}&home_team=${homeTeam}&date_time=${dateTime}`,
            }),
        }),
        tickpickTickets: builder.query({
            query: ({ homeTeam, dateTime }) => ({
                url: `/api/tickets/tickpick?home_team=${homeTeam}&date_time=${dateTime}`,
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
    useGameDetailsQuery,
    useSeatgeekTicketsQuery,
    useVividseatsTicketsQuery,
    useTickpickTicketsQuery,
    useDeleteUserMutation,
} = mlbApi
