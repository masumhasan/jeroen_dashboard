// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./services/api/baseApi";
import { recipeApi } from "./services/api/recipeApi";
import { topicApi } from "./services/api/topicApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [topicApi.reducerPath]: topicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      recipeApi.middleware,
      topicApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
