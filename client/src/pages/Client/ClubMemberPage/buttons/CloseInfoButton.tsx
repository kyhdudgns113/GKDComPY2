import {useCallback} from 'react'

import {useAppDispatch, useMemberActions} from '@store'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/CloseInfoButton.scss'

type CloseInfoButtonProps = DivCommonProps & {}

export const CloseInfoButton: FC<CloseInfoButtonProps> = ({className, style, ...props}) => {
  const dispatch = useAppDispatch()

  const {unselectClubMemberOpened} = useMemberActions()

  const onClickClose = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      dispatch(unselectClubMemberOpened())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className={`CloseInfo_Button ${className || ''}`} onClick={onClickClose} style={style} {...props}>
      닫기
    </div>
  )
}
