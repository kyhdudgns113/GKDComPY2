import {useCallback} from 'react'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

import './ResetDataBtn.scss'

type ResetDataBtnProps = ButtonCommonProps & {}

export const ResetDataBtn: FC<ResetDataBtnProps> = ({className, ...props}) => {
  const onClickReset = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    // TODO: 데이터 리셋 로직 구현
    alert('데이터 리셋')
  }, [])

  return (
    <button className={`ResetData_Btn ${className || ''}`} onClick={onClickReset} {...props}>
      리셋
    </button>
  )
}
