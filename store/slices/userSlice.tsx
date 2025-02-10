import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  value : {
    username: null,
    token: null,
    cities: []
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    login: (state, action) => {
      state.value.username = action.payload.username
      state.value.token = action.payload.token
      state.value.cities = action.payload.cities
    },
    logout: (state) => {
      state.value.username = null
      state.value.token = null
      state.value.cities = []
    }
  }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer