import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from '@store'

// State 타입 정의
interface LefterState {
  isOpen: boolean
  selectedRow: 'community' | 'log' | null
}

// 초기 상태
const initialState: LefterState = {
  isOpen: true,
  selectedRow: null
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const LefterSlice = createSlice({
  name: 'Lefter',
  initialState,
  reducers: {
    setLefterIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
    setLefterRowComm: state => {
      state.selectedRow = 'community'
    },
    setLefterRowLog: state => {
      state.selectedRow = 'log'
    },
    setLefterRowNull: state => {
      state.selectedRow = null
    },

    toggleLefterIsOpen: state => {
      state.isOpen = !state.isOpen
    }
  }
})

// 액션 생성자 export
export const {setLefterIsOpen, setLefterRowComm, setLefterRowLog, setLefterRowNull, toggleLefterIsOpen} = LefterSlice.actions

// Selector: 상태에서 copyMe 값 가져오기
export const selectLefterSelectedRow = (state: AdminStates) => state.Lefter.selectedRow
export const selectLefterIsOpen = (state: AdminStates) => state.Lefter.isOpen

// 리듀서 export
export const LefterReducer = LefterSlice.reducer
