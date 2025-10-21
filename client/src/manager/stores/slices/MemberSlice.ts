import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from '../store'

import * as NV from '@nullValue'
import * as ST from '@shareType'
import * as V from '@value'

// State 타입 정의
interface MemberState {
  clubMemberArr: ST.MemberType[]
  clubMemberOpened: ST.MemberType
  memberDeck: ST.CardType[]
  memSortType: number
  memberRecentRecordArr: ST.DailyRecordType[]
}

// 초기 상태
const initialState: MemberState = {
  clubMemberArr: [],
  clubMemberOpened: NV.NULL_MEMBER(),
  memberDeck: Array.from({length: 25}, (_, i) => NV.NULL_CARD(i)),
  memSortType: V.SORT_TYPE_NAME_ASC,
  memberRecentRecordArr: []
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
      state.clubMemberArr = action.payload.sort((a, b) => {
        if (a.position !== b.position) {
          return b.position - a.position
        }

        switch (state.memSortType) {
          case V.SORT_TYPE_NAME_ASC:
            return a.memName.localeCompare(b.memName)
          case V.SORT_TYPE_NAME_DESC:
            return b.memName.localeCompare(a.memName)
          case V.SORT_TYPE_BATTER_ASC:
            return a.batterPower - b.batterPower
          case V.SORT_TYPE_BATTER_DESC:
            return b.batterPower - a.batterPower
          case V.SORT_TYPE_PITCHER_ASC:
            return a.pitcherPower - b.pitcherPower
          case V.SORT_TYPE_PITCHER_DESC:
            return b.pitcherPower - a.pitcherPower
          case V.SORT_TYPE_TOTAL_ASC:
            return a.batterPower + a.pitcherPower - (b.batterPower + b.pitcherPower)
          case V.SORT_TYPE_TOTAL_DESC:
            return b.batterPower + b.pitcherPower - (a.batterPower + a.pitcherPower)
          default:
            return 0
        }
      })
    },
    // 클럽 멤버 배열 정렬
    sortClubMemberArr: state => {
      state.clubMemberArr.sort((a, b) => {
        if (a.position !== b.position) {
          return b.position - a.position
        }
        switch (state.memSortType) {
          case V.SORT_TYPE_NAME_ASC:
            return a.memName.localeCompare(b.memName)
          case V.SORT_TYPE_NAME_DESC:
            return b.memName.localeCompare(a.memName)
          case V.SORT_TYPE_BATTER_ASC:
            return a.batterPower - b.batterPower
          case V.SORT_TYPE_BATTER_DESC:
            return b.batterPower - a.batterPower
          case V.SORT_TYPE_PITCHER_ASC:
            return a.pitcherPower - b.pitcherPower
          case V.SORT_TYPE_PITCHER_DESC:
            return b.pitcherPower - a.pitcherPower
          case V.SORT_TYPE_TOTAL_ASC:
            return a.batterPower + a.pitcherPower - (b.batterPower + b.pitcherPower)
          case V.SORT_TYPE_TOTAL_DESC:
            return b.batterPower + b.pitcherPower - (a.batterPower + a.pitcherPower)
          default:
            return 0
        }
      })
    },
    // ::
    // clubMemberOpened 설정
    setClubMemberOpened: (state, action: PayloadAction<ST.MemberType>) => {
      state.clubMemberOpened = action.payload
      state.memberDeck = Array.from({length: 25}, (_, i) => NV.NULL_CARD(i))
    },
    // clubMemberOpened 해제
    unselectClubMemberOpened: state => {
      state.clubMemberOpened = NV.NULL_MEMBER()
    },
    // ::
    // memberDeck 초기화
    resetMemberDeck: state => {
      state.memberDeck = []
    },
    // memberDeck 설정
    setMemberDeck: (state, action: PayloadAction<ST.CardType[]>) => {
      state.memberDeck = action.payload
    },
    // ::
    // 정렬: 초기화
    resetMemSortType: state => {
      state.memSortType = V.SORT_TYPE_NAME_ASC
    },
    // 정렬: 이름순
    setMemSortTypeName: state => {
      if (state.memSortType === V.SORT_TYPE_NAME_ASC) {
        state.memSortType = V.SORT_TYPE_NAME_DESC
      } // ::
      else {
        state.memSortType = V.SORT_TYPE_NAME_ASC
      }
    },
    // 정렬: 타자순
    setMemSortTypeBatter: state => {
      if (state.memSortType === V.SORT_TYPE_BATTER_ASC) {
        state.memSortType = V.SORT_TYPE_BATTER_DESC
      } // ::
      else {
        state.memSortType = V.SORT_TYPE_BATTER_ASC
      }
    },
    // 정령: 투수순
    setMemSortTypePitcher: state => {
      if (state.memSortType === V.SORT_TYPE_PITCHER_ASC) {
        state.memSortType = V.SORT_TYPE_PITCHER_DESC
      } // ::
      else {
        state.memSortType = V.SORT_TYPE_PITCHER_ASC
      }
    },
    // 정령: 총합순
    setMemSortTypeTotal: state => {
      if (state.memSortType === V.SORT_TYPE_TOTAL_ASC) {
        state.memSortType = V.SORT_TYPE_TOTAL_DESC
      } // ::
      else {
        state.memSortType = V.SORT_TYPE_TOTAL_ASC
      }
    },
    // ::
    // memberRecentRecordArr 설정
    setMemberRecentRecordArr: (state, action: PayloadAction<ST.DailyRecordType[]>) => {
      state.memberRecentRecordArr = action.payload.sort((a, b) => {
        return b.dateVal - a.dateVal
      })
    }
  }
})

export const getMemberByMemOId = (memOId: string) => (state: AdminStates) =>
  state.Member.clubMemberArr.find(member => member.memOId === memOId) || NV.NULL_MEMBER()
