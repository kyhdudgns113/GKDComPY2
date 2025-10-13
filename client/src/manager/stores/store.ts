import {useDispatch, useSelector} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'

import * as Slices from './slices'

export const store = configureStore({
  reducer: {
    Club: Slices.clubSlice.reducer,
    Community: Slices.communitySlice.reducer,
    Modal: Slices.modalSlice.reducer,
    Template: Slices.templateSlice.reducer,
    Test: Slices.testSlice.reducer
  }
})

export type AdminStates = ReturnType<typeof store.getState>
export type AdminDispatchs = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AdminDispatchs>()
export const useAppSelector = useSelector.withTypes<AdminStates>()

export const useClubActions = () => Slices.clubSlice.actions
export const useCommunityActions = () => Slices.communitySlice.actions
export const useModalActions = () => Slices.modalSlice.actions
export const useTemplateActions = () => Slices.templateSlice.actions
export const useTestActions = () => Slices.testSlice.actions

export const useClubStates = () => useAppSelector(store.getState).Club
export const useCommunityStates = () => useAppSelector(store.getState).Community
export const useModalStates = () => useAppSelector(store.getState).Modal
export const useTemplateStates = () => useAppSelector(store.getState).Template
export const useTestStates = () => useAppSelector(store.getState).Test
