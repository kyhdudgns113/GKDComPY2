import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from '@store' // eslint-disable-line @typescript-eslint/no-unused-vars

// State 타입 정의
interface TestState {
  cnt: number
}

// 초기 상태
const initialState: TestState = {
  cnt: 0
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    // 1씩 증가
    incCnt: state => {
      state.cnt += 1
    },
    // 1씩 감소
    decCnt: state => {
      state.cnt -= 1
    },
    // 특정 값만큼 증가
    setCnt: (state, action: PayloadAction<number>) => {
      state.cnt = action.payload
    }
  }
})

// 액션 생성자 export
export const {incCnt, decCnt, setCnt} = testSlice.actions

// Selector: 상태에서 test 값 가져오기
export const selectTestCnt = (state: AdminStates) => state.Test.cnt

// 리듀서 export
export const TestReducer = testSlice.reducer
