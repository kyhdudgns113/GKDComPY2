import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

// State 타입 정의
interface DocState {
  docContents: string
}

// 초기 상태
const initialState: DocState = {
  docContents: ''
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const docSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    // 문서 내용 설정
    setDocContents: (state, action: PayloadAction<string>) => {
      state.docContents = action.payload
    },
    // 문서 내용 리셋
    resetDocContents: state => {
      state.docContents = ''
    }
  }
})
