import {useCallback} from 'react'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

import './LoadDataBtn.scss'

type LoadDataBtnProps = ButtonCommonProps & {}

export const LoadDataBtn: FC<LoadDataBtnProps> = ({className, ...props}) => {
  const onClickLoad = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    // TODO: 데이터 로드 로직 구현
    alert('데이터 불러오기')
  }, [])

  return (
    <button className={`LoadData_Btn ${className || ''}`} onClick={onClickLoad} {...props}>
      로드
    </button>
  )
}
