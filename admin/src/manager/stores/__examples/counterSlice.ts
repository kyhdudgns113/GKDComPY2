import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from 'src/manager/stores/__examples'

// State 타입 정의
interface CounterState {
  value: number
}

// 초기 상태
const initialState: CounterState = {
  value: 0
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // 1씩 증가
    increment: state => {
      state.value += 1
    },
    // 1씩 감소
    decrement: state => {
      state.value -= 1
    },
    // 특정 값만큼 증가
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    // 값을 리셋
    reset: state => {
      state.value = 0
    }
  }
})

// 액션 생성자 export
export const {increment, decrement, incrementByAmount, reset} = counterSlice.actions

// Selector: 상태에서 counter 값 가져오기
export const selectCount = (state: AdminStates) => state.counter.value

// 리듀서 export
export default counterSlice.reducer
