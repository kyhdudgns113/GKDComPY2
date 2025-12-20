import {useCallback} from 'react'

import {useAppDispatch, useEMemberActions} from '@store'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './ArrHeaderObj.scss'

type ArrHeaderObjProps = DivCommonProps & {clubOId: string}

export const ArrHeaderObj: FC<ArrHeaderObjProps> = ({clubOId, className, ...props}) => {
  const {sortEMembersByName, sortEMembersByBatterPower, sortEMembersByPitcherPower, sortEMembersByTotalPower} = useEMemberActions()

  const dispatch = useAppDispatch()

  const onClickBatter = useCallback(
    (clubOId: string) => () => {
      dispatch(sortEMembersByBatterPower(clubOId))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickName = useCallback(
    (clubOId: string) => () => {
      dispatch(sortEMembersByName(clubOId))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickPitcher = useCallback(
    (clubOId: string) => () => {
      dispatch(sortEMembersByPitcherPower(clubOId))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onClickTotal = useCallback(
    (clubOId: string) => () => {
      dispatch(sortEMembersByTotalPower(clubOId))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className={`ArrHeader_Obj ${className || ''}`} {...props}>
      <p className="_name_header _width_name_part _bd_right" onClick={onClickName(clubOId)}>
        이름
      </p>
      <p className="_batter_header _width_batter_part _bd_right" onClick={onClickBatter(clubOId)}>
        타자
      </p>
      <p className="_pitcher_header _width_pitcher_part _bd_right" onClick={onClickPitcher(clubOId)}>
        투수
      </p>
      <p className="_total_header _width_total_part" onClick={onClickTotal(clubOId)}>
        합계
      </p>
    </div>
  )
}
