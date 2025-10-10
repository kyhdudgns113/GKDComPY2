import {createSlice} from '@reduxjs/toolkit'

import type {AdminStates} from '@store'
import {MODAL_NAME_ADD_CLUB, MODAL_NAME_ADD_USER, MODAL_NAME_MODIFY_CLUB, MODAL_NAME_MODIFY_USER} from '@value'

// State 타입 정의
interface ModalState {
  modalName: string
}

// 초기 상태
const initialState: ModalState = {
  modalName: ''
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const ModalSlice = createSlice({
  name: 'Modal',
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
    // 유저 추가 모달 열기
    openModalAddUser: state => {
      state.modalName = MODAL_NAME_ADD_USER
    },
    // 클럽 수정 모달 열기
    openModalModifyClub: state => {
      state.modalName = MODAL_NAME_MODIFY_CLUB
    },
    // 유저 수정 모달 열기
    openModalModifyUser: state => {
      state.modalName = MODAL_NAME_MODIFY_USER
    }
  }
})

// 액션 생성자 export
export const {closeModal, openModalAddClub, openModalAddUser, openModalModifyClub, openModalModifyUser} = ModalSlice.actions

// Selector: 상태에서 test 값 가져오기
export const selectModalName = (state: AdminStates) => state.Modal.modalName

// 리듀서 export
export const ModalReducer = ModalSlice.reducer
