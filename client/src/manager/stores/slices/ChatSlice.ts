import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

import * as ST from '@shareType'

// State 타입 정의
interface ChatState {
  chatArr: ST.ChatType[]
  chatRoomOId: string
  chatQueue: ST.ChatType[]
}

// 초기 상태
const initialState: ChatState = {
  chatArr: [],
  chatRoomOId: '',
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
    // 채팅 배열 그냥 없앨때
    resetChatArr: state => {
      state.chatArr = []
    },
    // ::
    // 채팅방 OId 설정
    setChatRoomOId: (state, action: PayloadAction<string>) => {
      state.chatRoomOId = action.payload
    },
    // 채팅방 OId 리셋
    resetChatRoomOId: state => {
      state.chatRoomOId = ''
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
        state.chatArr = [...state.chatArr, ...chatQueue]
        state.chatQueue = []
      }
    },
    // 채팅 큐 그냥 없앨때
    resetChatQueue: state => {
      state.chatQueue = []
    }
  }
})
