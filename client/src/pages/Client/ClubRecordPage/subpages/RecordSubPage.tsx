import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/SP_Record.scss'

type RecordSubPageProps = DivCommonProps & {}

export const RecordSubPage: FC<RecordSubPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`Record_SubPage ${className || ''}`} style={style} {...props}>
      <p>RecordSP</p>
    </div>
  )
}
