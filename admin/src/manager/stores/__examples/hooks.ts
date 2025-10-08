import {useDispatch, useSelector} from 'react-redux'
import type {AdminDispatchs, AdminStates} from './store'

// TypeScript용 커스텀 hooks
// useDispatch와 useSelector에 타입을 미리 지정해두면 매번 타입을 명시하지 않아도 됩니다

export const useAppDispatch = useDispatch.withTypes<AdminDispatchs>()
export const useAppSelector = useSelector.withTypes<AdminStates>()
