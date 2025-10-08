import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from 'src/manager/stores/__examples'

// User State 타입 정의
interface UserState {
  name: string
  age: number
  email: string
}

// 초기 상태
const initialState: UserState = {
  name: '',
  age: 0,
  email: ''
}

// User Slice 생성
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name
      state.age = action.payload.age
      state.email = action.payload.email
    },
    resetUser: state => {
      state.name = ''
      state.age = 0
      state.email = ''
    }
  }
})

// 액션 생성자 export
export const {setName, setAge, setEmail, setUser, resetUser} = userSlice.actions

// Selectors
export const selectUser = (state: AdminStates) => state.user
export const selectUserName = (state: AdminStates) => state.user.name
export const selectUserAge = (state: AdminStates) => state.user.age
export const selectUserEmail = (state: AdminStates) => state.user.email

// 리듀서 export
export default userSlice.reducer
