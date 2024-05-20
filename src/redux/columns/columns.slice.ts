import { createSlice } from "@reduxjs/toolkit";

import {
 fetchColumns,
 changeTaskOrder,
 deleteTask,
 addTask,
 editTask,
 moveTask,
} from "./columns.controller";

import { IColumn, IError } from "../../utils/types";

interface IState {
 columns: IColumn[];
 error: IError | null;
 success: string | null;
}

const initialState: IState = {
 columns: [],
 error: null,
 success: null,
};

const columnsSlice = createSlice({
 name: "columns",
 initialState,
 reducers: {
  clearColumnError: (state) => {
   state.error = null;
  },
  clearColumnSuccess: (state) => {
   state.success = null;
  },
 },
 extraReducers: (builder) => {
  builder
   .addCase(fetchColumns.fulfilled, (state, action) => {
    state.columns = action.payload;
    state.success = "Columns fetched successfully";
    state.error = null;
   })
   .addCase(fetchColumns.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(changeTaskOrder.fulfilled, (state, action) => {
    state.columns.map((column) => {
     if (column._id === action.payload.columnId) {
      column.tasks = action.payload.data;
     }
    });
    state.success = "Task order changed successfully";
    state.error = null;
   })
   .addCase(changeTaskOrder.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(deleteTask.fulfilled, (state, action) => {
    state.columns.map((column) => {
     column.tasks = column.tasks.filter(
      (task) => task._id.toString() !== action.payload?.taskId
     );
    });
    state.success = "Task deleted successfully";
   })
   .addCase(deleteTask.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(addTask.fulfilled, (state, action) => {
    state.columns.map((column) => {
     if (column._id === action.payload?.columnId) {
      column.tasks.push(action.payload.task);
     }
    });
    state.success = "Task added successfully";
    state.error = null;
   })
   .addCase(addTask.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(editTask.fulfilled, (state, action) => {
    state.columns.map((column) => {
     if (column._id === action.payload?.columnId) {
      const taskIndex = column.tasks.findIndex(
       (task) => task._id === action.payload?.taskId
      );
      if (taskIndex !== -1) {
       column.tasks[taskIndex].title = action.payload.title;
       column.tasks[taskIndex].caption = action.payload.caption;
      }
     }
    });
    state.success = "Task edited successfully";
    state.error = null;
   })
   .addCase(editTask.rejected, (state, action) => {
    state.error = action.payload as IError;
   })
   .addCase(moveTask.fulfilled, (state, action) => {
    if (!action.payload) return;
    const fromColumnIndex = state.columns.findIndex(
     (column) => column._id === action.payload?.fromColumnId
    );
    const toColumnIndex = state.columns.findIndex(
     (column) => column._id === action.payload?.newColumnId
    );
    if (fromColumnIndex !== -1) {
     const taskIndex = state.columns[fromColumnIndex].tasks.findIndex(
      (task) => task._id === action.payload?.task?._id
     );
     if (taskIndex !== -1) {
      state.columns[fromColumnIndex].tasks.splice(taskIndex, 1);
     }
    }
    if (toColumnIndex !== -1) {
     const newIndex =
      action.payload.insertAtIndex === -1
       ? state.columns[toColumnIndex].tasks.length
       : action.payload.insertAtIndex;
     state.columns[toColumnIndex].tasks.splice(
      newIndex,
      0,
      action.payload.task
     );
    }
    state.success = "Task moved successfully";
   })
   .addCase(moveTask.rejected, (state, action) => {
    state.error = action.payload as IError;
   });
 },
});

export const { clearColumnError, clearColumnSuccess } = columnsSlice.actions;

export default columnsSlice.reducer;
