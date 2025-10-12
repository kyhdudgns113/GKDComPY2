import {useCallback} from 'react'

import {useAppDispatch, useModalActions} from '@store'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

type ClubRowObjectProps = DivCommonProps & {
  club: ClubType
}

export const ClubRowObject: FC<ClubRowObjectProps> = ({club, className, style, ...props}) => {
  const dispatch = useAppDispatch()
  const {selectModifyClub, openModalModifyClub} = useModalActions()

  const onClickClubRow = useCallback(
    (club: ClubType) => (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      dispatch(selectModifyClub(club))
      dispatch(openModalModifyClub())
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div
      className={`ClubRow_Object __ROW_COMMON ${className || ''}`}
      onClick={onClickClubRow(club)}
      style={style}
      {...props} // ::
    >
      <p className="_title_object">{club.clubName}</p>
    </div>
  )
}
