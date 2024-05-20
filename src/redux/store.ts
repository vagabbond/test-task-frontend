import { configureStore } from "@reduxjs/toolkit";
import boardRedcer from "./boards/board.slice";
import columnsReducer from "./columns/columns.slice";

export const store = configureStore({
 reducer: {
  boards: boardRedcer,
  columns: columnsReducer,
 },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
