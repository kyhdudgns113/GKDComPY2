import {useDispatch, useSelector} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'

import * as Slices from './slices'

export const store = configureStore({
  reducer: {
    Community: Slices.CommunityReducer,
    Template: Slices.TemplateReducer,
    Test: Slices.TestReducer
  }
})

export type AdminStates = ReturnType<typeof store.getState>
export type AdminDispatchs = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AdminDispatchs>()
export const useAppSelector = useSelector.withTypes<AdminStates>()
