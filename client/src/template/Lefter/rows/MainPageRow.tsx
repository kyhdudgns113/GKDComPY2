import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

type MainPageRowProps = DivCommonProps & {}

export const MainPageRow: FC<MainPageRowProps> = ({className, style, ...props}) => {
  const navigate = useNavigate()

  const onClickRow = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate('/client/main')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`MainPage_Row _row ${className || ''}`} onClick={onClickRow} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_row">메인 페이지</p>
    </div>
  )
}
