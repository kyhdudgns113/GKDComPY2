import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
// import type {AdminStates} from '@store'

import * as NV from '@nullValue'
import * as ST from '@shareType'
import * as T from '@type'
import * as V from '@value'
import type {AdminStates} from '../store'

// State 타입 정의
interface CommunityState {
  banClub: ST.ClubType
  clubArr: ST.ClubType[]
  commMemberArr: ST.MemberType[] // 메인 페이지의 전체 멤버 목록 확인에 사용
  commMemberSortMode: number
  community: ST.CommunityType
  subClub: ST.ClubType
  userArr: ST.UserType[]
}

// 초기 상태
const initialState: CommunityState = {
  banClub: NV.NULL_CLUB(),
  clubArr: [],
  commMemberArr: [],
  commMemberSortMode: V.COMM_MEMBER_SORT_MODE_CLUB,
  community: NV.NULL_COMMUNITY(),
  subClub: NV.NULL_CLUB(),
  userArr: []
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    // banClub 설정
    setBanClub: (state, action: PayloadAction<ST.ClubType>) => {
      state.banClub = action.payload
    },
    // ::
    // clubArr 설정
    setClubArr: (state, action: PayloadAction<ST.ClubType[]>) => {
      state.clubArr = action.payload
    },
    // commMemberArr 설정 (모드에 의해 정렬해서 넣는다.)
    setCommMemberArr: (state, action: PayloadAction<ST.MemberType[]>) => {
      const clubPriority: T.ClubPriorityType = {}

      const sortMode = state.commMemberSortMode

      if (sortMode === V.COMM_MEMBER_SORT_MODE_CLUB) {
        state.clubArr.forEach((club, clubIdx) => {
          clubPriority[club.clubOId] = clubIdx
        })
        clubPriority[state.community.subClubOId] = 20000
        clubPriority[state.community.banClubOId] = 10000

        // 클럽 우선순위 이후 이름별 정렬
        action.payload.sort((a, b) => {
          const clubOIda = a.clubOId
          const clubOIdb = b.clubOId

          const priorityA = clubPriority[clubOIda] || 0
          const priorityB = clubPriority[clubOIdb] || 0

          if (priorityA < priorityB) return -1
          if (priorityA > priorityB) return 1
          return a.memName.localeCompare(b.memName)
        })
      } // ::
      else if (sortMode === V.COMM_MEMBER_SORT_MODE_NAME) {
        // 이름순 정렬
        action.payload.sort((a, b) => a.memName.localeCompare(b.memName))
      } // ::

      state.commMemberArr = action.payload
    },
    // community 설정
    setCommunity: (state, action: PayloadAction<ST.CommunityType>) => {
      state.community = action.payload
    },
    // userArr 설정
    setUserArr: (state, action: PayloadAction<ST.UserType[]>) => {
      state.userArr = action.payload
    },
    // 공동체 멤버 클럽 우선순위별 정렬모드로 설정
    setCommMemberSortMode: state => {
      state.commMemberSortMode = V.COMM_MEMBER_SORT_MODE_CLUB
    },
    // 공동체 멤버 이름순 정렬모드로 설정
    setCommMemberSortModeName: state => {
      state.commMemberSortMode = V.COMM_MEMBER_SORT_MODE_NAME
    },
    // ::
    // subClub 설정
    setSubClub: (state, action: PayloadAction<ST.ClubType>) => {
      state.subClub = action.payload
    }
    // ::
  }
})

export const getClubFromClubOId = (clubOId: string) => (state: AdminStates) => state.Community.clubArr.find(club => club.clubOId === clubOId) || null
