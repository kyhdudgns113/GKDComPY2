import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

import * as ST from '@shareType'
import * as NV from '@nullValue'
import * as V from '@value'

// State 타입 정의
interface ModalState {
  clubSelected: ST.ClubType // 메인 페이지에서 수정할때 쓴다.
  modalName: string
  userSelected: ST.UserType // 메인 페이지에서 수정할때 쓴다.
}

// 초기 상태
const initialState: ModalState = {
  clubSelected: NV.NULL_CLUB(),
  modalName: '',
  userSelected: NV.NULL_USER()
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // AREA1: 모달 영역
    // 모달 닫기
    closeModal: state => {
      state.modalName = ''
    },
    // 클럽 추가 모달 열기
    openModalAddClub: state => {
      state.modalName = V.MODAL_NAME_ADD_CLUB
    },
    // 멤버 추가 모달 열기
    openModalAddMember: state => {
      state.modalName = V.MODAL_NAME_ADD_MEMBER
    },
    // 멤버 추가 모달 열기
    openModalAddRowMember: state => {
      state.modalName = V.MODAL_NAME_ADD_ROW_MEMBER
    },
    // 멤버 삭제 모달 열기
    openModalDelMember: state => {
      state.modalName = V.MODAL_NAME_DEL_MEMBER
    },
    // 유저 추가 모달 열기
    openModalAddUser: state => {
      state.modalName = V.MODAL_NAME_ADD_USER
    },
    // 클럽 수정 모달 열기
    openModalModifyClub: state => {
      state.modalName = V.MODAL_NAME_MODIFY_CLUB
    },
    // 대전 기록 일간 정보 수정 모달 열기
    openModalModifyDailyInfo: state => {
      state.modalName = V.MODAL_NAME_MODIFY_DAILY_INFO
    },
    // 유저 수정 모달 열기
    openModalModifyUser: state => {
      state.modalName = V.MODAL_NAME_MODIFY_USER
    },
    // 주간 정보 수정 모달 열기
    openModalModifyWeeklyInfo: state => {
      state.modalName = V.MODAL_NAME_MODIFY_WEEKLY_INFO
    },
    // AREA2: 정보 영역
    // 선택: 수정할 클럽
    selectModifyClub: (state, action: PayloadAction<ST.ClubType>) => {
      state.clubSelected = action.payload
    },
    // 선택: 수정할 유저
    selectModifyUser: (state, action: PayloadAction<ST.UserType>) => {
      state.userSelected = action.payload
    },
    // 해제: 수정할 클럽
    unselectModifyClub: state => {
      state.clubSelected = NV.NULL_CLUB()
    },
    // 해제: 수정할 유저
    unselectModifyUser: state => {
      state.userSelected = NV.NULL_USER()
    }
  }
})
