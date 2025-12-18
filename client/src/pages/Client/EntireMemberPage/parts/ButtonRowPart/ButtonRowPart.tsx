import {LoadDataBtn, ResetDataBtn, SaveDataBtn} from '../../buttons'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './ButtonRowPart.scss'

type ButtonRowPartProps = DivCommonProps & {}

export const ButtonRowPart: FC<ButtonRowPartProps> = ({className, style, ...props}) => {
  return (
    <div className={`ButtonRow_Part ${className || ''}`} style={style} {...props}>
      <SaveDataBtn />
      <LoadDataBtn />
      <ResetDataBtn />
    </div>
  )
}
