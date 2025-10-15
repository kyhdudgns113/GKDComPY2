import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
// import type {AdminStates} from '@store'

import * as ST from '@shareType'
import * as NV from '@nullValue'
import type {AdminStates} from '../store'

// State 타입 정의
interface CommunityState {
  clubArr: ST.ClubType[]
  community: ST.CommunityType
  userArr: ST.UserType[]
}

// 초기 상태
const initialState: CommunityState = {
  clubArr: [],
  community: NV.NULL_COMMUNITY(),
  userArr: []
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    // clubArr 설정
    setClubArr: (state, action: PayloadAction<ST.ClubType[]>) => {
      state.clubArr = action.payload
    },
    // community 설정
    setCommunity: (state, action: PayloadAction<ST.CommunityType>) => {
      state.community = action.payload
    },
    // userArr 설정
    setUserArr: (state, action: PayloadAction<ST.UserType[]>) => {
      state.userArr = action.payload
    }
    // ::
  }
})

export const getClubFromClubOId = (clubOId: string) => (state: AdminStates) => state.Community.clubArr.find(club => club.clubOId === clubOId) || null
