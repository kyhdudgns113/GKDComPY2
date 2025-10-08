import {createSlice} from '@reduxjs/toolkit'

import type {AdminStates} from '@store'

// State 타입 정의
interface LefterState {
  selectedRow: 'community' | 'log' | null
}

// 초기 상태
const initialState: LefterState = {
  selectedRow: null
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const LefterSlice = createSlice({
  name: 'Lefter',
  initialState,
  reducers: {
    setLefterRowComm: state => {
      state.selectedRow = 'community'
    },
    setLefterRowLog: state => {
      state.selectedRow = 'log'
    },
    setLefterRowNull: state => {
      state.selectedRow = null
    }
  }
})

// 액션 생성자 export
export const {setLefterRowComm, setLefterRowLog, setLefterRowNull} = LefterSlice.actions

// Selector: 상태에서 copyMe 값 가져오기
export const selectLefterSelectedRow = (state: AdminStates) => state.Lefter.selectedRow

// 리듀서 export
export const LefterReducer = LefterSlice.reducer
