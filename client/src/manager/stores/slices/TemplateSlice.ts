import {createSlice} from '@reduxjs/toolkit'

import type {AdminStates} from '@store'

// State 타입 정의
interface TemplateState {
  isLefterOpen: boolean
}

// 초기 상태
const initialState: TemplateState = {
  isLefterOpen: false
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    // Lefter 토글
    toggleLefterIsOpen: state => {
      state.isLefterOpen = !state.isLefterOpen
    }
  }
})

// 액션 생성자 export
export const {toggleLefterIsOpen} = templateSlice.actions

// Selector: 상태에서 Template 값 가져오기
export const selectIsLefterOpen = (state: AdminStates) => state.Template.isLefterOpen

// 리듀서 export
export const TemplateReducer = templateSlice.reducer
