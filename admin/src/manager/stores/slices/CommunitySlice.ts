import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from '@store' // eslint-disable-line @typescript-eslint/no-unused-vars

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
    selectCommunity: (state, action: PayloadAction<ST.CommunityType>) => {
      state.commOIdSelected = action.payload.commOId
    },
    setCommunityArr: (state, action: PayloadAction<ST.CommunityType[]>) => {
      state.commArr = action.payload
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
export const selectCommOIdSeleceted = (state: AdminStates) => state.Community.commOIdSelected

// 리듀서 export
export const CommunityReducer = communitySlice.reducer
