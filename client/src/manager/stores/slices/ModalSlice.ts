import {createSlice} from '@reduxjs/toolkit'

import {MODAL_NAME_ADD_CLUB, MODAL_NAME_ADD_MEMBER, MODAL_NAME_ADD_USER} from '@value'

// State 타입 정의
interface ModalState {
  modalName: string
}

// 초기 상태
const initialState: ModalState = {
  modalName: ''
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // 모달 닫기
    closeModal: state => {
      state.modalName = ''
    },
    // 클럽 추가 모달 열기
    openModalAddClub: state => {
      state.modalName = MODAL_NAME_ADD_CLUB
    },
    // 멤버 추가 모달 열기
    openModalAddMember: state => {
      state.modalName = MODAL_NAME_ADD_MEMBER
    },
    // 유저 추가 모달 열기
    openModalAddUser: state => {
      state.modalName = MODAL_NAME_ADD_USER
    }
  }
})
