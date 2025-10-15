import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from '../store'

import * as NV from '@nullValue'
import * as ST from '@shareType'

// State 타입 정의
interface MemberState {
  clubMemberArr: ST.MemberType[]
  clubMemberOpened: ST.MemberType
}

// 초기 상태
const initialState: MemberState = {
  clubMemberArr: [],
  clubMemberOpened: NV.NULL_MEMBER()
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    // 클럽 멤버 배열 초기화
    resetClubMemberArr: state => {
      state.clubMemberArr = []
    },
    // 클럽 멤버 배열 설정
    setClubMemberArr: (state, action: PayloadAction<ST.MemberType[]>) => {
      state.clubMemberArr = action.payload
    },
    // ::
    // clubMemberOpened 설정
    setClubMemberOpened: (state, action: PayloadAction<ST.MemberType>) => {
      state.clubMemberOpened = action.payload
    },
    // clubMemberOpened 해제
    unselectClubMemberOpened: state => {
      state.clubMemberOpened = NV.NULL_MEMBER()
    }
    // ::
  }
})

export const getMemberByMemOId = (memOId: string) => (state: AdminStates) =>
  state.Member.clubMemberArr.find(member => member.memOId === memOId) || NV.NULL_MEMBER()
