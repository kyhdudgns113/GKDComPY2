import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

import * as ST from '@shareType'

// State 타입 정의
interface EMemberState {
  eMembers: {[clubOId: string]: ST.EMemberType[]}
}

// 초기 상태
const initialState: EMemberState = {
  eMembers: {}
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

      // 기존 클럽에서 멤버 제거
      state.eMembers[prevClubOId] = state.eMembers[prevClubOId].filter(eMember => eMember.memName !== memName)

      // 새로운 클럽에 멤버 추가
      if (newIdx === null) {
        state.eMembers[newClubOId].push(eMember)
      } // ::
      else {
        state.eMembers[newClubOId].splice(newIdx, 0, eMember)
      }
    },

    setEMembers: (state, action: PayloadAction<{[clubOId: string]: ST.EMemberType[]}>) => {
      state.eMembers = action.payload
    },
    setEMembersFromArr: (state, action: PayloadAction<ST.MemberType[]>) => {
      const newEMembers: {[clubOId: string]: ST.EMemberType[]} = {}

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
      })

      state.eMembers = newEMembers
    }
  }
})
