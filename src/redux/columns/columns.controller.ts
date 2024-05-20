import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

import {
 IAddProps,
 IChangeOrderProps,
 IDeletProps,
 IMoveProps,
 IEditProps,
 IError,
} from "../../utils/types";

export const fetchColumns = createAsyncThunk(
 "columns/fetchColumns",
 async (boardId: string, { rejectWithValue }) => {
  try {
   const response = await axios.get(`/api/columns/${boardId}`);
   return response.data;
  } catch (error) {
   if (axios.isAxiosError(error) && error.response) {
    const typedError = {
     message: error.response.data.message,
     code: error.response.status,
    } as IError;
    return rejectWithValue(typedError);
   }
  }
 }
);

export const changeTaskOrder = createAsyncThunk(
 "columns/changeTaskOrder",
 async (
  { insertAtIndex, columnId, taskId }: IChangeOrderProps,
  { rejectWithValue }
 ) => {
  try {
   const res = await axios.patch(`/api/columns/order/${columnId}`, {
    taskId,
    insertAtIndex,
   });
   const data = res.data;
   return { columnId, data };
  } catch (error) {
   const typedError = error as IError;
   return rejectWithValue(typedError);
  }
 }
);

export const addTask = createAsyncThunk(
 "columns/createTask",
 async (params: IAddProps, { rejectWithValue }) => {
  try {
   const response = await axios.post(`/api/columns/${params.columnId}`, {
    title: params.title,
    caption: params.caption,
   });
   return {
    task: response.data,
    columnId: params.columnId,
   };
  } catch (error) {
   if (axios.isAxiosError(error) && error.response) {
    const typedError = {
     message: error.response.data.message,
     code: error.response.status,
    } as IError;
    return rejectWithValue(typedError);
   }
  }
 }
);

export const moveTask = createAsyncThunk(
 "tasks/moveTask",
 async (
  { taskId, newColumnId, fromColumnId, insertAtIndex }: IMoveProps,
  { rejectWithValue }
 ) => {
  try {
   const res = await axios.patch(`/api/columns/${newColumnId}`, {
    taskId,
    fromColumnId,
    insertAtIndex,
   });
   const data = res.data;
   return {
    task: data.task,
    newColumnId: data.newColumnId,
    fromColumnId: data.fromColumnId,
    insertAtIndex,
   };
  } catch (error) {
   if (axios.isAxiosError(error) && error.response) {
    const typedError = {
     message: error.response.data.message,
     code: error.response.status,
    } as IError;
    return rejectWithValue(typedError);
   }
  }
 }
);

export const deleteTask = createAsyncThunk(
 "tasks/deleteTask",
 async ({ taskId, columnId }: IDeletProps, { rejectWithValue }) => {
  try {
   await axios.delete(`/api/columns/${columnId}/task/${taskId}`);
   return { taskId };
  } catch (error) {
   if (axios.isAxiosError(error) && error.response) {
    const typedError = {
     message: error.response.data.message,
     code: error.response.status,
    } as IError;
    return rejectWithValue(typedError);
   }
  }
 }
);

export const editTask = createAsyncThunk(
 "tasks/editTask",
 async (
  { taskId, columnId, title, caption }: IEditProps,
  { rejectWithValue }
 ) => {
  try {
   const resp = await axios.patch(`/api/columns/task/${taskId}`, {
    caption,
    columnId,
    title,
   });
   const data = resp.data;
   return {
    taskId,
    columnId,
    title: data.title,
    caption: data.caption,
   };
  } catch (error) {
   if (axios.isAxiosError(error) && error.response) {
    const typedError = {
     message: error.response.data.message,
     code: error.response.status,
    } as IError;
    return rejectWithValue(typedError);
   }
  }
 }
);
