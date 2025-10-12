import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

import * as ST from '@shareType'
import * as NV from '@nullValue'
import * as V from '@value'

// State 타입 정의
interface ModalState {
  modalName: string
  userSelected: ST.UserType
}

// 초기 상태
const initialState: ModalState = {
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
    // 유저 추가 모달 열기
    openModalAddUser: state => {
      state.modalName = V.MODAL_NAME_ADD_USER
    },
    // 클럽 수정 모달 열기
    openModalModifyClub: state => {
      state.modalName = V.MODAL_NAME_MODIFY_CLUB
    },
    // 멤버 수정 모달 열기
    openModalModifyMember: state => {
      state.modalName = V.MODAL_NAME_MODIFY_MEMBER
    },
    // 유저 수정 모달 열기
    openModalModifyUser: state => {
      state.modalName = V.MODAL_NAME_MODIFY_USER
    },
    // AREA2: 정보 영역
    // 수정할 유저 선택
    selectModifyUser: (state, action: PayloadAction<ST.UserType>) => {
      state.userSelected = action.payload
    },
    unselectModifyUser: state => {
      state.userSelected = NV.NULL_USER()
    }
  }
})
