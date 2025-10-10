import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from '@store'

import * as NV from '@nullValue'
import * as ST from '@shareType'

/**
 * CommunityState
 * - commArr: ST.CommunityType[]
 *     + 초기값: []
 *     + 전체 공동체의 배열
 *     + CommunityPage 로딩되면 서버에서 불러온다. (loadCommArr)
 * - commClubArr: ST.ClubType[]
 *     + 초기값: []
 *     + 선택된 공동체의 클럽의 배열
 *     + community context 에서 공동체 선택시 서버에서 불러온다
 * - commOIdSelected: string
 *     + 초기값: ''
 *     + 선택된 공동체의 OId
 *     + CommRowObject 에서 공동체를 클릭하면 변경된다
 * - commUserArr: ST.UserType[]
 *     + 초기값: []
 *     + 선택된 공동체의 유저의 배열
 *     + community context 에서 공동체 선택시 서버에서 불러온다
 * - userSelected: ST.UserType
 *     + 초기값: NV.NULL_USER()
 *     + 선택된 유저
 *     + 공동체 관리 페이지에서 유저를 선택하면 변경된다
 */
interface CommunityState {
  clubSelected: ST.ClubType
  commArr: ST.CommunityType[]
  commClubArr: ST.ClubType[]
  commOIdSelected: string
  commUserArr: ST.UserType[]
  userSelected: ST.UserType
}

// 초기 상태
const initialState: CommunityState = {
  clubSelected: NV.NULL_CLUB(),
  commArr: [],
  commClubArr: [],
  commOIdSelected: '',
  commUserArr: [],
  userSelected: NV.NULL_USER()
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    // AREA1: clubSelected
    selectClub: (state, action: PayloadAction<ST.ClubType>) => {
      state.clubSelected = action.payload
    },
    unselectClub: state => {
      state.clubSelected = NV.NULL_CLUB()
    },
    // AREA2: commArr
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
    // AREA3: commClubArr
    setCommClubArr: (state, action: PayloadAction<ST.ClubType[]>) => {
      state.commClubArr = action.payload
    },
    // AREA4: commOIdSelected
    selectCommunity: (state, action: PayloadAction<ST.CommunityType>) => {
      state.commOIdSelected = action.payload.commOId
    },
    unselectCommunity: state => {
      state.commOIdSelected = ''
    },
    // AREA5: commUserArr
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
    // AREA6: userOIdSelected
    selectUser: (state, action: PayloadAction<ST.UserType>) => {
      state.userSelected = action.payload
    },
    unselectUser: state => {
      state.userSelected = NV.NULL_USER()
    }
  }
})

// 액션 생성자 export
export const {
  selectClub,
  unselectClub,

  modifyCommunity,
  modifyCommUser,

  setCommClubArr,

  selectCommunity,
  setCommunityArr,

  unselectCommunity,
  setCommUserArr,

  selectUser,
  unselectUser
} = communitySlice.actions

// Selector: 상태에서 community 값 가져오기
export const selectSelectedClub = (state: AdminStates) => state.Community.clubSelected
export const selectCommunityArr = (state: AdminStates) => state.Community.commArr
export const selectCommClubArr = (state: AdminStates) => state.Community.commClubArr
export const selectCommOIdSelected = (state: AdminStates) => state.Community.commOIdSelected
export const selectSelectedCommunity = (state: AdminStates) =>
  state.Community.commArr.find(comm => comm.commOId === state.Community.commOIdSelected) || NV.NULL_COMMUNITY()
export const selectCommUserArr = (state: AdminStates) => state.Community.commUserArr
export const selectSelectedUser = (state: AdminStates) => state.Community.userSelected

// 리듀서 export
export const CommunityReducer = communitySlice.reducer
