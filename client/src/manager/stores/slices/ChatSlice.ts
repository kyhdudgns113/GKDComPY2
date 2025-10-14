import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

import * as ST from '@shareType'

// State 타입 정의
interface ChatState {
  chatArr: ST.ChatType[]
  chatQueue: ST.ChatType[]
}

// 초기 상태
const initialState: ChatState = {
  chatArr: [],
  chatQueue: []
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // 채팅 처음 불러올때
    setChatArr: (state, action: PayloadAction<ST.ChatType[]>) => {
      state.chatArr = action.payload
    },
    // 이전 채팅 불러올때
    pushFrontChatArr: (state, action: PayloadAction<ST.ChatType[]>) => {
      state.chatArr = [...action.payload, ...state.chatArr]
    },
    // ::
    // 채팅 실시간으로 수신될때
    pushChatQueue: (state, action: PayloadAction<ST.ChatType>) => {
      state.chatQueue.push(action.payload)
    },
    // 채팅 큐에서 배열로 넘겨줄때
    popChatQueueToArr: state => {
      const chatQueue = state.chatQueue
      if (chatQueue.length > 0) {
        state.chatArr = [...chatQueue, ...state.chatArr]
        state.chatQueue = []
      }
    }
  }
})
