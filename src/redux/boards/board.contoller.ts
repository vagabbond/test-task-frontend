import { createAsyncThunk } from "@reduxjs/toolkit";

import { IError } from "../../utils/types";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export const createBoard = createAsyncThunk(
 "board/createBoard",
 async (params: { name: string }, thunkApi) => {
  try {
   console.log("creating board");
   const response = await axios.post("/api/boards", params);
   console.log(response.data);
   return response.data;
  } catch (error) {
   console.log(error);
   const typedError = error as IError;
   return thunkApi.rejectWithValue(typedError);
  }
 }
);

export const fetchBoard = createAsyncThunk(
 "board/fetchBoard",
 async (name: string, { rejectWithValue }) => {
  try {
   const response = await axios.get(`/api/boards/${name}`);
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

export const updateBoardName = createAsyncThunk(
 "board/updateBoardName",
 async ({ id, name }: { id: string; name: string }, { rejectWithValue }) => {
  try {
   const response = await axios.patch(`/api/boards/${id}`, { name: name });
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

export const deleteBoard = createAsyncThunk(
 "board/deleteBoard",
 async (id: string, { rejectWithValue }) => {
  try {
   const response = await axios.delete(`/api/boards/${id}`);
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
