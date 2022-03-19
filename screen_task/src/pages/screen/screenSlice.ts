import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ScreenState {
  users: any;
  editData: any;
  editStatus: boolean;
}

interface IForm {
  getUser: (id: string) => void;
  getUsers: () => void;
  createNewUser: (data: any) => void;
  editUser: (data: any, id: string) => void;
  deleteUser: (id: string) => void;
}

const initialState: ScreenState = {
  users: [],
  editData: [],
  editStatus: false,
};

export const getUser = createAsyncThunk<IForm, { id: string }>(
  "user/getUser",
  async (id) => {
    const response = await axios.get(`${process.env.REACT_APP_API}/user/${id}`);
    return response.data;
  }
);

export const getUsers = createAsyncThunk<IForm>("user/getUsers", async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}/users`);
  return response.data;
});

export const createNewUser = createAsyncThunk<IForm, { data: any }>(
  "user/createNewUser",
  async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/user`,
      data
    );
    return response.data;
  }
);

export const editUser = createAsyncThunk<IForm, { data: any; id: string }>(
  "user/editUser",
  async (data, id) => {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/user/${id}`,
      data
    );
    return response.data;
  }
);

export const deleteUser = createAsyncThunk<IForm, { id: string }>(
  "user/deleteUser",
  async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/user/${id}`
    );
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    user: (state, action: PayloadAction<any>) => {
      state.editData.push(action.payload);
    },
    edit: (state, action: PayloadAction<boolean>) => {
      state.editStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled,(state, action) =>{
        state.editData = action.payload;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(createNewUser.fulfilled,(state, action)=>{
        state.users = [...state.users, action.payload];
      })
  },
});

export const { user, edit } = userSlice.actions;

export default userSlice.reducer;
