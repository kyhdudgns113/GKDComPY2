import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

type CancelInfoButtonProps = ButtonCommonProps & {}

export const CancelInfoButton: FC<CancelInfoButtonProps> = ({className, style, ...props}) => {
  return (
    <button className={`CancelInfo_Button ${className || ''}`} style={style} {...props}>
      취소
    </button>
  )
}
