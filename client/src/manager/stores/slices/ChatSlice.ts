import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

import * as ST from '@shareType'

// State 타입 정의
interface ChatState {
  chatArr: ST.ChatType[]
}

// 초기 상태
const initialState: ChatState = {
  chatArr: []
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatArr: (state, action: PayloadAction<ST.ChatType[]>) => {
      state.chatArr = action.payload
    }
  }
})
