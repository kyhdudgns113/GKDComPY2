import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from '@store'

import * as NV from '@nullValue'
import * as ST from '@shareType'

// State 타입 정의
interface CommunityState {
  commArr: ST.CommunityType[]
  commOIdSelected: string
  commUserArr: ST.UserType[]
  userSelected: ST.UserType
}

// 초기 상태
const initialState: CommunityState = {
  commArr: [],
  commOIdSelected: '',
  commUserArr: [],
  userSelected: NV.NULL_USER()
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    // AREA1: commArr
    modifyCommunity: (state, action: PayloadAction<ST.CommunityType>) => {
      const {commOId} = action.payload
      const index = state.commArr.findIndex(comm => comm.commOId === commOId)
      if (index !== -1) {
        state.commArr[index] = action.payload
      } // ::
      else {
        state.commArr.push(action.payload)
      }
    },
    setCommunityArr: (state, action: PayloadAction<ST.CommunityType[]>) => {
      state.commArr = action.payload
    },
    // AREA2: commOIdSelected
    selectCommunity: (state, action: PayloadAction<ST.CommunityType>) => {
      state.commOIdSelected = action.payload.commOId
    },
    unselectCommunity: state => {
      state.commOIdSelected = ''
    },
    // AREA3: commUserArr
    modifyCommUser: (state, action: PayloadAction<ST.UserType>) => {
      const {userOId} = action.payload
      const index = state.commUserArr.findIndex(user => user.userOId === userOId)
      if (index !== -1) {
        state.commUserArr[index] = action.payload
      } // ::
      else {
        state.commUserArr.push(action.payload)
      }
    },
    setCommUserArr: (state, action: PayloadAction<ST.UserType[]>) => {
      state.commUserArr = action.payload
    },
    // AREA4: userOIdSelected
    selectUser: (state, action: PayloadAction<ST.UserType>) => {
      state.userSelected = action.payload
    },
    unselectUser: state => {
      state.userSelected = NV.NULL_USER()
    }
  }
})

// 액션 생성자 export
export const {modifyCommunity, modifyCommUser, selectCommunity, setCommunityArr, unselectCommunity, setCommUserArr, selectUser, unselectUser} =
  communitySlice.actions

// Selector: 상태에서 community 값 가져오기
export const selectCommunityArr = (state: AdminStates) => state.Community.commArr
export const selectCommOIdSelected = (state: AdminStates) => state.Community.commOIdSelected
export const selectSelectedCommunity = (state: AdminStates) =>
  state.Community.commArr.find(comm => comm.commOId === state.Community.commOIdSelected) || NV.NULL_COMMUNITY()
export const selectCommUserArr = (state: AdminStates) => state.Community.commUserArr
export const selectSelectedUser = (state: AdminStates) => state.Community.userSelected

// 리듀서 export
export const CommunityReducer = communitySlice.reducer
