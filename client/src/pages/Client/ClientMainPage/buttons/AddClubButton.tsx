import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

type AddClubButtonProps = ButtonCommonProps & {}

export const AddClubButton: FC<AddClubButtonProps> = ({className, style, ...props}) => {
  return (
    <button className={`AddClub_Button ${className || ''}`} style={style} {...props}>
      클럽 추가
    </button>
  )
}
