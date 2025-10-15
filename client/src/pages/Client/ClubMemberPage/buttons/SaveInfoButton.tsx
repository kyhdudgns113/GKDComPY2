import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

type SaveInfoButtonProps = ButtonCommonProps & {}

export const SaveInfoButton: FC<SaveInfoButtonProps> = ({className, style, ...props}) => {
  return (
    <button className={`SaveInfo_Button ${className || ''}`} style={style} {...props}>
      수정
    </button>
  )
}
