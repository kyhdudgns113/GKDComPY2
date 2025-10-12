import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from '@store'

import * as ST from '@shareType'
import * as NV from '@nullValue'

// State 타입 정의
interface CommunityState {
  community: ST.CommunityType
}

// 초기 상태
const initialState: CommunityState = {
  community: NV.NULL_COMMUNITY()
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    // community 설정
    setCommunity: (state, action: PayloadAction<ST.CommunityType>) => {
      state.community = action.payload
    }
    // ::
  }
})

// 액션 생성자 export
export const {setCommunity} = communitySlice.actions

// Selector: 상태에서 community 값 가져오기
export const selectCommunity = (state: AdminStates) => state.Community.community

// 리듀서 export
export const CommunityReducer = communitySlice.reducer
