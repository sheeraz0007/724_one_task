import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usersList: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      const newData = {
        ...state,
        usersList: payload?.usersList || [],
      };
      return newData;
    },
  },
});

export default userSlice.reducer;

export const { setUserData, editUserData } = userSlice.actions;
