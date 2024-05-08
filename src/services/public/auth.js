import { publicApi } from './index';

const authApi = publicApi.injectEndpoints({
  endpoints: builder => ({
    getUsersList: builder.query({
      query: ({ limit, skip }) => ({
        url: `/users?skip=${skip}&limit=${limit}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUsersListQuery } = authApi;
export const test = '';
