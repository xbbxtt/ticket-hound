import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const mlbApi = createApi({
    reducerPath: 'mlbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import meta.env.VITE_API_HOST
    }),
    endpoints: (builder) => ({
        listmlbTeams: builder.query({
            query: () => ({
                url: '/api/teams'
            })
        })
    })
})

export const { useListMlbTeamsQuery } = mlbApi
