import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

import * as ST from '@shareType'

// State 타입 정의
interface RecordState {
  weekOIdOpened: string
  weekRowArr: ST.WeekRowType[]
}

// 초기 상태
const initialState: RecordState = {
  weekOIdOpened: '',
  weekRowArr: []
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    // 주차 OId 해제
    resetWeekOIdOpened: state => {
      state.weekOIdOpened = ''
    },
    // 주차 OId 설정
    setWeekOIdOpened: (state, action: PayloadAction<string>) => {
      state.weekOIdOpened = action.payload
    },
    // ::
    // 주차 배열 설정
    setWeekRowArr: (state, action: PayloadAction<ST.WeekRowType[]>) => {
      state.weekRowArr = action.payload
    }
  }
})
