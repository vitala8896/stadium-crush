import { configureStore } from '@reduxjs/toolkit';
import facet from './facet';

const reducers = { facet };

export const store = configureStore({
  reducer: reducers,
  devTools: true
});
