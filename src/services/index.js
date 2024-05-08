import { publicApi } from './public';

export const serviceReducers = {
  [publicApi.reducerPath]: publicApi.reducer,
};

export const serviceMiddlewares = [publicApi.middleware];
