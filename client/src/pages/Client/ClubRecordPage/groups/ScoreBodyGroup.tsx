import {useGetEnemyClubName, useRecordStates} from '@store'

import type {FC} from 'react'
import type {TableBodyCommonProps} from '@prop'

import * as T from '@type'

import '../_styles/Grp_ScoreBody.scss'

type ScoreBodyGroupProps = TableBodyCommonProps & {}

type RowStats = {
  sumWin: number
  sumDraw: number
  sumLose: number
  sumTropy: number
  sumPoints: number
  hasDuplicate: boolean
}

/**
 * ScoreBodyGroup: 팀 점수 표 본문 그룹
 */
export const ScoreBodyGroup: FC<ScoreBodyGroupProps> = ({className, style, ...props}) => {
  const {matchBlockMatrix} = useRecordStates()
  const getEnemyClubName = useGetEnemyClubName()

  return (
    <tbody className={`ScoreBody_Group ${className || ''}`} style={style} {...props}>
      {[-1, 0, 1, 2, 3, 4].map((dayIdx, rowIdx) => {
        const stats = getRowStats(matchBlockMatrix, rowIdx)

        return (
          <tr key={dayIdx} className={stats.hasDuplicate ? '_has_duplicate' : ''}>
            <td className="_td_club_name">{getEnemyClubName(dayIdx)}</td>
            <td>{stats.sumWin}</td>
            <td>{stats.sumDraw}</td>
            <td>{stats.sumLose}</td>
            <td>{stats.sumTropy}</td>
            <td title={stats.hasDuplicate ? '중복 기록된 데이터는 집계에서 제외됨' : undefined}>{stats.sumPoints}</td>
          </tr>
        )
      })}
    </tbody>
  )
}

function getRowStats(matchBlockMatrix: T.MatchBlockInfoType[][], rowIdx: number): RowStats {
  const stats: RowStats = {sumWin: 0, sumDraw: 0, sumLose: 0, sumTropy: 0, sumPoints: 0, hasDuplicate: false}

  for (let colIdx = 0; colIdx < 6; colIdx++) {
    if (rowIdx === colIdx) continue

    const block = matchBlockMatrix[rowIdx][colIdx]

    if (block.dayIdxArr.length >= 2) {
      stats.hasDuplicate = true
      continue
    }
    if (block.dayIdxArr.length !== 1) continue

    if (block.result === '승') stats.sumWin += 1
    else if (block.result === '무') stats.sumDraw += 1
    else if (block.result === '패') stats.sumLose += 1

    stats.sumTropy += block.tropy
    stats.sumPoints += block.points
  }

  return stats
}
