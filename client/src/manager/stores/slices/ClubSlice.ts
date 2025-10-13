import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import * as ST from '@shareType'
import * as NV from '@nullValue'

// State 타입 정의
interface ClubState {
  clubOpened: ST.ClubType
}

// 초기 상태
const initialState: ClubState = {
  clubOpened: NV.NULL_CLUB()
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const clubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {
    // clubOpened 설정
    setClubOpened: (state, action: PayloadAction<ST.ClubType>) => {
      state.clubOpened = action.payload
    },
    // clubOpened 초기화
    resetClubOpened: state => {
      state.clubOpened = NV.NULL_CLUB()
    }
  }
})
