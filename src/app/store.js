import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from '../features/accounts/accountsSlice.js';
import reposReducer from '../features/repos/reposSlice.js';

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    repos: reposReducer,
  },
});
