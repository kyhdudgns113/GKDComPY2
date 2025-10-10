import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'

import {useAppDispatch, useAppSelector} from '@store'
import {setLefterRowComm, setLefterRowLog, setLefterRowNull} from '@store'
import {selectModalName} from '@store'
import {MODAL_NAME_ADD_USER, MODAL_NAME_MODIFY_USER} from '@value'

import {Footer} from './Footer'
import {Header} from './Header'
import {Lefter} from './Lefter'
import {ModalAddUser, ModalModifyUser} from './Modals'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_styles/Template.scss'

type TemplateProps = DivCommonProps & {}

export const Template: FC<TemplateProps> = ({className, style, ...props}) => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const modalName = useAppSelector(selectModalName)

  // 초기화: URL 에 따라서 Lefter 의 selectedRow 를 설정
  useEffect(() => {
    const path = location.pathname
    if (path.includes('/admin/community')) {
      dispatch(setLefterRowComm())
    } // ::
    else if (path.includes('/admin/log')) {
      dispatch(setLefterRowLog())
    } // ::
    else {
      dispatch(setLefterRowNull())
    }
  }, [dispatch, location.pathname])

  return (
    <div className={`Template ${className || ''}`} style={style} {...props}>
      {/* 1. Template 영역 */}
      <Header />
      <div className="Body">
        <Lefter />
        <Outlet />
      </div>
      <Footer />

      {/* 2. 모달 모아둔곳 */}
      {modalName === MODAL_NAME_ADD_USER && <ModalAddUser />}
      {modalName === MODAL_NAME_MODIFY_USER && <ModalModifyUser />}
    </div>
  )
}
