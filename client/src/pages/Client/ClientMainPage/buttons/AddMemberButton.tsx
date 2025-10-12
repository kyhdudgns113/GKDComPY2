import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

type AddMemberButtonProps = ButtonCommonProps & {}

export const AddMemberButton: FC<AddMemberButtonProps> = ({className, style, ...props}) => {
  return (
    <button className={`AddMember_Button ${className || ''}`} style={style} {...props}>
      멤버 추가
    </button>
  )
}
