import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from '@store' // eslint-disable-line @typescript-eslint/no-unused-vars

// State 타입 정의
interface CopyMeState {
  value: number
}

// 초기 상태
const initialState: CopyMeState = {
  value: 0
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const copyMeSlice = createSlice({
  name: 'copyMe',
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
    }
  }
})

// 액션 생성자 export
export const {increment, decrement, incrementByAmount} = copyMeSlice.actions

// Selector: 상태에서 copyMe 값 가져오기
// export const selectCopyMe = (state: AdminStates) => state.copyMe.value

// 리듀서 export
export const CopyMeReducer = copyMeSlice.reducer
