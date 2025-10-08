import {useCallback} from 'react'
import {useAppSelector} from '@store'
import {selectLefterSelectedRow} from '@store'
import {useNavigate} from 'react-router-dom'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

type LogRowPartProps = DivCommonProps & {}

export const LogRowPart: FC<LogRowPartProps> = ({className, style, ...props}) => {
  const navigate = useNavigate()

  const selectedRow = useAppSelector(selectLefterSelectedRow)

  const onClickRowPart = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    navigate('/admin/log')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={`LogRow_Part _row_part ${selectedRow === 'log' ? '_selected' : ''} ${className}`}
      style={style}
      onClick={onClickRowPart}
      {...props} // ::
    >
      <p className="_title">Log</p>
    </div>
  )
}
