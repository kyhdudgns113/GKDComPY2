import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './userSlice'
import todoReducer from './todoSlice'

// Redux Store 생성 - 하나의 Store에 여러 Slice를 통합
export const store = configureStore({
  reducer: {
    counter: counterReducer, // 카운터 상태 관리
    user: userReducer, // 사용자 정보 상태 관리
    todo: todoReducer // Todo 리스트 상태 관리
    // 여기에 더 많은 slice들을 추가할 수 있습니다
    // posts: postsReducer,
    // auth: authReducer,
    // etc...
  }
})

// TypeScript 타입 정의
export type AdminStates = ReturnType<typeof store.getState>
export type AdminDispatchs = typeof store.dispatch
