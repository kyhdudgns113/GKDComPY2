import {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'

import * as Slices from './slices'

export const store = configureStore({
  reducer: {
    Chat: Slices.chatSlice.reducer,
    Club: Slices.clubSlice.reducer,
    Community: Slices.communitySlice.reducer,
    Document: Slices.docSlice.reducer,
    EMember: Slices.eMemberSlice.reducer,
    Member: Slices.memberSlice.reducer,
    Modal: Slices.modalSlice.reducer,
    Record: Slices.recordSlice.reducer,
    Template: Slices.templateSlice.reducer,
    Test: Slices.testSlice.reducer
  }
})

export type AdminStates = ReturnType<typeof store.getState>
export type AdminDispatchs = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AdminDispatchs>()
export const useAppSelector = useSelector.withTypes<AdminStates>()

// AREA1: States

export const useChatStates = () => useAppSelector(state => state.Chat)
export const useClubStates = () => useAppSelector(state => state.Club)
export const useCommunityStates = () => useAppSelector(state => state.Community)
export const useDocumentStates = () => useAppSelector(state => state.Document)
export const useMemberStates = () => useAppSelector(state => state.Member)
export const useModalStates = () => useAppSelector(state => state.Modal)
export const useRecordStates = () => useAppSelector(state => state.Record)
export const useTemplateStates = () => useAppSelector(state => state.Template)

// AREA1-1: 파생 훅 (여러 state 조합)

export const useGetEnemyClubName = () => {
  const {clubOpened} = useClubStates()
  const {dateInfoArr} = useRecordStates()
  return useCallback(
    (index: number) => Slices.getEnemyClubName(clubOpened, index, dateInfoArr),
    [clubOpened, dateInfoArr]
  )
}
export const useTestStates = () => useAppSelector(state => state.Test)

// AREA2: Actions

export const useChatActions = () => Slices.chatSlice.actions
export const useClubActions = () => Slices.clubSlice.actions
export const useCommunityActions = () => Slices.communitySlice.actions
export const useDocumentActions = () => Slices.docSlice.actions
export const useEMemberActions = () => Slices.eMemberSlice.actions
export const useMemberActions = () => Slices.memberSlice.actions
export const useModalActions = () => Slices.modalSlice.actions
export const useRecordActions = () => Slices.recordSlice.actions
export const useTemplateActions = () => Slices.templateSlice.actions
export const useTestActions = () => Slices.testSlice.actions
