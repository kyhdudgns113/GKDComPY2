import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

import * as ST from '@shareType'
import * as V from '@value'

// State 타입 정의
interface EMemberState {
  eMembers: {[clubOId: string]: ST.EMemberType[]}
  sortTypes: {[clubOId: string]: number}
}

// 초기 상태
const initialState: EMemberState = {
  eMembers: {},
  sortTypes: {}
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const eMemberSlice = createSlice({
  name: 'eMember',
  initialState,
  reducers: {
    moveEMember: (state, action: PayloadAction<{prevClubOId: string; memName: string; newClubOId: string; newIdx: number | null}>) => {
      const {prevClubOId, memName, newClubOId, newIdx} = action.payload

      const eMember = state.eMembers[prevClubOId].find(eMember => eMember.memName === memName)
      if (!eMember) {
        return
      }

      eMember.clubOId = newClubOId

      // 기존 클럽에서 멤버 제거
      state.eMembers[prevClubOId] = state.eMembers[prevClubOId].filter(eMember => eMember.memName !== memName)

      // 기존 클럽의 posIdx 업데이트
      state.eMembers[prevClubOId].forEach((member, idx) => {
        member.posIdx = idx
      })

      // 새로운 클럽에 멤버 추가
      if (newIdx === null) {
        state.eMembers[newClubOId].push(eMember)
      } // ::
      else {
        state.eMembers[newClubOId].splice(newIdx, 0, eMember)
      }

      // 새로운 클럽의 posIdx 업데이트
      state.eMembers[newClubOId].forEach((member, idx) => {
        member.posIdx = idx
      })
    },

    setEMembers: (state, action: PayloadAction<{[clubOId: string]: ST.EMemberType[]}>) => {
      state.eMembers = action.payload
    },
    setEMembersFromArr: (state, action: PayloadAction<ST.MemberType[]>) => {
      const newEMembers: {[clubOId: string]: ST.EMemberType[]} = {}
      const newSortTypes: {[clubOId: string]: number} = {}

      action.payload.forEach((member, memIdx) => {
        if (!newEMembers[member.clubOId]) {
          newEMembers[member.clubOId] = []
        }
        const newEMember: ST.EMemberType = {
          batterPower: member.batterPower,
          clubOId: member.clubOId,
          memName: member.memName,
          pitcherPower: member.pitcherPower,
          position: member.position,
          posIdx: memIdx,
          prevClubOId: member.clubOId
        }
        newEMembers[member.clubOId].push(newEMember)
        newSortTypes[member.clubOId] = V.SORT_TYPE_USER_SETTING
      })

      state.eMembers = newEMembers
      state.sortTypes = newSortTypes
    },

    sortEMembersByBatterPower: (state, action: PayloadAction<string>) => {
      const clubOId = action.payload

      if (state.sortTypes[clubOId] === V.SORT_TYPE_BATTER_ASC) {
        state.sortTypes[clubOId] = V.SORT_TYPE_BATTER_DESC
        state.eMembers[clubOId].sort((a, b) => b.batterPower - a.batterPower)
      } // ::
      else {
        state.sortTypes[clubOId] = V.SORT_TYPE_BATTER_ASC
        state.eMembers[clubOId].sort((a, b) => a.batterPower - b.batterPower)
      }
    },
    sortEMembersByPitcherPower: (state, action: PayloadAction<string>) => {
      const clubOId = action.payload

      if (state.sortTypes[clubOId] === V.SORT_TYPE_PITCHER_ASC) {
        state.sortTypes[clubOId] = V.SORT_TYPE_PITCHER_DESC
        state.eMembers[clubOId].sort((a, b) => b.pitcherPower - a.pitcherPower)
      } // ::
      else {
        state.sortTypes[clubOId] = V.SORT_TYPE_PITCHER_ASC
        state.eMembers[clubOId].sort((a, b) => a.pitcherPower - b.pitcherPower)
      }
    },
    sortEMembersByTotalPower: (state, action: PayloadAction<string>) => {
      const clubOId = action.payload

      if (state.sortTypes[clubOId] === V.SORT_TYPE_TOTAL_ASC) {
        state.sortTypes[clubOId] = V.SORT_TYPE_TOTAL_DESC
        state.eMembers[clubOId].sort((a, b) => b.batterPower + b.pitcherPower - (a.batterPower + a.pitcherPower))
      } // ::
      else {
        state.sortTypes[clubOId] = V.SORT_TYPE_TOTAL_ASC
        state.eMembers[clubOId].sort((a, b) => a.batterPower + a.pitcherPower - (b.batterPower + b.pitcherPower))
      }
    },
    sortEMembersByName: (state, action: PayloadAction<string>) => {
      const clubOId = action.payload

      if (state.sortTypes[clubOId] === V.SORT_TYPE_NAME_ASC) {
        state.sortTypes[clubOId] = V.SORT_TYPE_NAME_DESC
        state.eMembers[clubOId].sort((a, b) => b.memName.localeCompare(a.memName))
      } // ::
      else {
        state.sortTypes[clubOId] = V.SORT_TYPE_NAME_ASC
        state.eMembers[clubOId].sort((a, b) => a.memName.localeCompare(b.memName))
      }
    }
  }
})
