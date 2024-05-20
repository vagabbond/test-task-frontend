import { createSlice } from "@reduxjs/toolkit";
import {
 createBoard,
 fetchBoard,
 updateBoardName,
 deleteBoard,
} from "./board.contoller";
import { IBoard, IError } from "../../utils/types";

interface IState {
 board: IBoard | null;
 error: IError | null;
 success: string | null;
}

const initialState: IState = {
 board: null,
 error: null,
 success: null,
};

const boardSlice = createSlice({
 name: "board",
 initialState,
 reducers: {
  clearBoardError: (state) => {
   state.error = null;
  },
  clearBoardSuccess: (state) => {
   state.success = null;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(createBoard.fulfilled, (state, action) => {
    state.board = action.payload;
    state.success = "Board created successfully";
    state.error = null;
   })
   .addCase(createBoard.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(fetchBoard.fulfilled, (state, action) => {
    state.board = action.payload;
    state.success = "Board fetched successfully";
    state.error = null;
   })
   .addCase(fetchBoard.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(updateBoardName.fulfilled, (state, action) => {
    state.board = action.payload;
    state.success = "Board name updated successfully";
    state.error = null;
   })

   .addCase(updateBoardName.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(deleteBoard.fulfilled, (state) => {
    state.board = null;
    state.success = "Board deleted successfully";
    state.error = null;
   })
   .addCase(deleteBoard.rejected, (state, action) => {
    state.error = action.payload as IError;
   });
 },
});

export const { clearBoardError, clearBoardSuccess } = boardSlice.actions;
export default boardSlice.reducer;
