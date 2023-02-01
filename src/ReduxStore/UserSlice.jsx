import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userName: "",
  userPhoto:"",
  userEmail:""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogIn: (state, action) => {
        state.userName = action.payload.name;
        state.userPhoto = action.payload.photo;
        state.userEmail = action.payload.email;
      },
      setUserLogOut:(state) => {
        state.userName = ""
        state.userPhoto = ""
        state.userEmail = ""
   }
  },
})

// Action creators are generated for each case reducer function
export const { setUserLogIn,setUserLogOut  } = userSlice.actions

export default userSlice.reducer