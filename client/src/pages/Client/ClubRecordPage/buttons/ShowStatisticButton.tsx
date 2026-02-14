import {useCallback} from 'react'

import {useAppDispatch, useRecordActions, useRecordStates} from '@store'

import type {FC, MouseEvent} from 'react'

import type {DivCommonProps} from '@prop'

import '../_styles/BTN_ShowStatistic.scss'

type ShowStatisticButtonProps = DivCommonProps & {}

export const ShowStatisticButton: FC<ShowStatisticButtonProps> = ({...props}) => {
  const {showModeRecord} = useRecordStates()
  const {openShowModeStatistic} = useRecordActions()

  const dispatch = useAppDispatch()

  const onClickShowStatistic = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    dispatch(openShowModeStatistic())
  }, []) // eslint-disable-line

  return (
    <div
      className={`ShowStatistic_Button ${showModeRecord === 'statistic' ? '_on' : '_off'}`}
      onClick={onClickShowStatistic}
      {...props} // ::
    >
      통계 화면
    </div>
  )
}
