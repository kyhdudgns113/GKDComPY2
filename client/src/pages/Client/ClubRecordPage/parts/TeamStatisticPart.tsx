import {useEffect, useState} from 'react'

import {useAppDispatch, useRecordActions, useRecordStates} from '@store'

import {TeamScoreObject, TeamMatchObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as ST from '@shareType'

import '../_styles/Part_TeamStatistic.scss'

type TeamStatisticPartProps = DivCommonProps & {
  weekRow: ST.WeekRowType
}

/* eslint-disable */
export const TeamStatisticPart: FC<TeamStatisticPartProps> = ({weekRow, ...props}) => {
  const {dateInfoArr, showModeRecord} = useRecordStates()
  const {setMatchBlockMatrixFromDateInfoArr} = useRecordActions()

  const dispatch = useAppDispatch()

  const [isShowStatistic, setIsShowStatistic] = useState<boolean>(false)

  // 초기화: 표시 모드 상태 관리
  useEffect(() => {
    setIsShowStatistic(showModeRecord === 'statistic')
  }, [showModeRecord])

  // 초기화: matchBlockMatrix 설정
  useEffect(() => {
    dispatch(setMatchBlockMatrixFromDateInfoArr())
  }, [dateInfoArr, dispatch])

  return (
    <div className={`TeamStatistic_Part `} hidden={!isShowStatistic} {...props}>
      <TeamMatchObject weekRow={weekRow} />
      <TeamScoreObject weekRow={weekRow} />
    </div>
  )
}
