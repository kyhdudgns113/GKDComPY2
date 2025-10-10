import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from '@store'

import * as NV from '@nullValue'
import * as ST from '@shareType'

// State 타입 정의
interface CommunityState {
  commArr: ST.CommunityType[]
  commOIdSelected: string
}

// 초기 상태
const initialState: CommunityState = {
  commArr: [],
  commOIdSelected: ''
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setCommunityArr: (state, action: PayloadAction<ST.CommunityType[]>) => {
      state.commArr = action.payload
    },
    // ::
    selectCommunity: (state, action: PayloadAction<ST.CommunityType>) => {
      state.commOIdSelected = action.payload.commOId
    },
    unselectCommunity: state => {
      state.commOIdSelected = ''
    }
  }
})

// 액션 생성자 export
export const {selectCommunity, setCommunityArr, unselectCommunity} = communitySlice.actions

// Selector: 상태에서 community 값 가져오기
export const selectCommunityArr = (state: AdminStates) => state.Community.commArr
export const selectCommOIdSelected = (state: AdminStates) => state.Community.commOIdSelected
export const selectSelectedCommunity = (state: AdminStates) =>
  state.Community.commArr.find(comm => comm.commOId === state.Community.commOIdSelected) || NV.NULL_COMMUNITY()

// 리듀서 export
export const CommunityReducer = communitySlice.reducer
