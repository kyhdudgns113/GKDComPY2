import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAppSelector} from '@store'
import {selectLefterSelectedRow} from '@store'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

type CommunityRowPartProps = DivCommonProps & {}

export const CommunityRowPart: FC<CommunityRowPartProps> = ({className, style, ...props}) => {
  const navigate = useNavigate()

  const selectedRow = useAppSelector(selectLefterSelectedRow)

  const onClickRowPart = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate('/admin/community')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`CommunityRow_Part _row_part ${selectedRow === 'community' ? '_selected' : ''} ${className}`}
      style={style}
      onClick={onClickRowPart}
      {...props} // ::
    >
      <p className="_title">Community</p>
    </div>
  )
}
