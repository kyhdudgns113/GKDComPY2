import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

type EntireMemberRowProps = DivCommonProps & {}

export const EntireMemberRow: FC<EntireMemberRowProps> = ({className, style, ...props}) => {
  const navigate = useNavigate()

  const onClickRow = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate('/client/entire')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`EntireMember_Row _row ${className || ''}`} onClick={onClickRow} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_row">전체 멤버</p>
    </div>
  )
}
