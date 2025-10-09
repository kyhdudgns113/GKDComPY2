import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'

import {useAppDispatch} from '@store'
import {setLefterRowComm, setLefterRowLog, setLefterRowNull} from '@store'

import {Footer} from './Footer'
import {Header} from './Header'
import {Lefter} from './Lefter'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_styles/Template.scss'

type TemplateProps = DivCommonProps & {}

export const Template: FC<TemplateProps> = ({className, style, ...props}) => {
  const location = useLocation()
  const dispatch = useAppDispatch()

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
      <Header />
      <div className="Body">
        <Lefter />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
