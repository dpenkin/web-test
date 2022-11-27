import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { todoApiServer } from '../services';

export const store = configureStore({
  reducer: {
    [todoApiServer.reducerPath]: todoApiServer.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    todoApiServer.middleware,
  ),
});

setupListeners(store.dispatch);

