import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

import * as ST from '@shareType'
import * as NV from '@nullValue'

// State 타입 정의
interface TemplateState {
  clubOpened: ST.ClubType
  isLefterOpen: boolean
}

// 초기 상태
const initialState: TemplateState = {
  clubOpened: NV.NULL_CLUB(),
  isLefterOpen: true
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    // clubOpened 설정
    setClubOpened: (state, action: PayloadAction<ST.ClubType>) => {
      state.clubOpened = action.payload
    },
    // clubOpened 초기화
    resetClubOpened: state => {
      state.clubOpened = NV.NULL_CLUB()
    },
    // Lefter 토글
    toggleLefterIsOpen: state => {
      state.isLefterOpen = !state.isLefterOpen
    }
  }
})
