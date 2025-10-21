import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

import * as NV from '@nullValue'
import * as ST from '@shareType'
import * as T from '@type'

// State 타입 정의
interface ClubState {
  clubOpened: ST.ClubType
  clubPriority: T.ClubPriorityType
}

// 초기 상태
const initialState: ClubState = {
  clubOpened: NV.NULL_CLUB(),
  clubPriority: {}
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
    /**
     * 클럽 선택 해제
     * - 해제할 수 있는건 다 해제한다.
     */
    resetClubOpened: state => {
      state.clubOpened = NV.NULL_CLUB()
    },
    // ::
    // clubPriority 요소 추가 혹은 덮어쓰기
    addClubPriority: (state, action: PayloadAction<T.ClubPriorityType>) => {
      Object.keys(action.payload).forEach(clubOId => {
        state.clubPriority[clubOId] = action.payload[clubOId]
      })
    }
  }
})
