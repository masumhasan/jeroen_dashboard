// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./services/api/baseApi";
import { recipeApi } from "./services/api/recipeApi";
import { userRecipeApi } from "./services/api/userRecipeApi";
import { topicApi } from "./services/api/topicApi";
import { allergyApi } from "./services/api/allergyApi";
import { dietaryPreferenceApi } from "./services/api/dietaryPreferenceApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [userRecipeApi.reducerPath]: userRecipeApi.reducer,
    [topicApi.reducerPath]: topicApi.reducer,
    [allergyApi.reducerPath]: allergyApi.reducer,
    [dietaryPreferenceApi.reducerPath]: dietaryPreferenceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      recipeApi.middleware,
      userRecipeApi.middleware,
      topicApi.middleware,
      allergyApi.middleware,
      dietaryPreferenceApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
