import {useEffect, useState} from 'react'

import {useRecordStates} from '@store'

import {TeamScoreObject, TeamMatchObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as ST from '@shareType'
import * as T from '@type'

import '../_styles/Part_TeamStatistic.scss'

type TeamStatisticPartProps = DivCommonProps & {
  weekRow: ST.WeekRowType
}

/* eslint-disable */
export const TeamStatisticPart: FC<TeamStatisticPartProps> = ({weekRow, ...props}) => {
  const {showModeRecord} = useRecordStates()

  const [isShowStatistic, setIsShowStatistic] = useState<boolean>(false)

  const {dateInfoArr} = useRecordStates()

  const [blockMatrix, setBlockMatrix] = useState<T.MatchBlockInfoType[][]>(
    Array.from({length: 6}, () =>
      Array.from({length: 6}, () => {
        return {
          dayIdxArr: [],
          result: '?',
          tropy: 0,
          points: 0
        }
      })
    )
  )

  // 초기화: 데이터 블록 배열
  useEffect(() => {
    const newBlockMatrix = Array.from({length: 6}, () =>
      Array.from({length: 6}, () => {
        return {
          dayIdxArr: [],
          result: '?',
          tropy: 0,
          points: 0
        } as T.MatchBlockInfoType
      })
    )

    dateInfoArr.forEach((dateInfo, dayIdx) => {
      const {teamResultArr} = dateInfo

      teamResultArr.forEach(teamResult => {
        const [dayIdxA, tropyA, pointsA, winResult, pointsB, tropyB, dayIdxB] = teamResult

        // 같은 팀 끼리의 대전결과는 저장해서 안된다.
        if (dayIdxA === dayIdxB) {
          return
        }

        const [rowIdxA, rowIdxB] = [dayIdxA + 1, dayIdxB + 1]

        newBlockMatrix[rowIdxA][rowIdxB].dayIdxArr.push(dayIdx)
        newBlockMatrix[rowIdxB][rowIdxA].dayIdxArr.push(dayIdx)

        newBlockMatrix[rowIdxA][rowIdxB].result = winResult === -1 ? '승' : winResult === 0 ? '무' : '패'
        newBlockMatrix[rowIdxB][rowIdxA].result = winResult === -1 ? '패' : winResult === 0 ? '무' : '승'

        newBlockMatrix[rowIdxA][rowIdxB].tropy = tropyA
        newBlockMatrix[rowIdxB][rowIdxA].tropy = tropyB

        newBlockMatrix[rowIdxA][rowIdxB].points = pointsA
        newBlockMatrix[rowIdxB][rowIdxA].points = pointsB
      })
    })

    setBlockMatrix(newBlockMatrix)
  }, [dateInfoArr])

  // 초기화: 표시 모드 상태 관리
  useEffect(() => {
    setIsShowStatistic(showModeRecord === 'statistic')
  }, [showModeRecord])

  return (
    <div className={`TeamStatistic_Part `} hidden={!isShowStatistic} {...props}>
      <TeamMatchObject blockMatrix={blockMatrix} weekRow={weekRow} />
      <TeamScoreObject blockMatrix={blockMatrix} weekRow={weekRow} />
    </div>
  )
}
