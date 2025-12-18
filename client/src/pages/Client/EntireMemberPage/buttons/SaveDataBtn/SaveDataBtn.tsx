import {useCallback} from 'react'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

import './SaveDataBtn.scss'

type SaveDataBtnProps = ButtonCommonProps & {}

export const SaveDataBtn: FC<SaveDataBtnProps> = ({className, ...props}) => {
  const onClickSave = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    // TODO: 데이터 저장 로직 구현
    alert('데이터 저장')
  }, [])

  return (
    <button className={`SaveData_Btn ${className || ''}`} onClick={onClickSave} {...props}>
      저장
    </button>
  )
}
