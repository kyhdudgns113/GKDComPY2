import {useGetEnemyClubName, useRecordStates} from '@store'

import type {FC} from 'react'
import type {TableBodyCommonProps} from '@prop'

import * as ST from '@shareType'

import '../_styles/Grp_MatchBody.scss'

type MatchBodyGroupProps = TableBodyCommonProps & {
  weekRow: ST.WeekRowType
}

const DATE_ARR = ['월', '화', '수', '목', '금', '토']

/* eslint-disable */

export const MatchBodyGroup: FC<MatchBodyGroupProps> = ({weekRow, ...props}) => {
  const {matchBlockMatrix} = useRecordStates()

  const getEnemyClubName = useGetEnemyClubName()

  return (
    <tbody className={`MatchBody_Group `} {...props}>
      {[-1, 0, 1, 2, 3, 4].map((dayIdx, rowIdx) => {
        return (
          <tr key={dayIdx}>
            {/* 1. 클럽 이름 */}
            <td className="_td_club_name">{getEnemyClubName(dayIdx)}</td>

            {/* 2. 대전기록 블록들 */}
            {Array.from({length: 6}).map((_, colIdx) => {
              let CN = ''
              let content = ''

              // 나 자신과의 대전기록은 존재하지 않으며, 이를 배경색으로 구분한다.
              if (rowIdx === colIdx) {
                CN += ' _blank '
                content = ' '
              } // ::
              else {
                const {dayIdxArr, result, tropy, points} = matchBlockMatrix[rowIdx][colIdx]
                if (dayIdxArr.length > 1) {
                  CN += ' _duplicate '
                  content = '데이터 중복\n'
                  content += `[${dayIdxArr.map(dayIdx => DATE_ARR[dayIdx]).join(', ')}]`
                } // ::
                else if (dayIdxArr.length === 1) {
                  if (result === '승') {
                    CN += ' _win '
                  } // ::
                  else if (result === '패') {
                    CN += ' _lose '
                  }

                  content += `[${DATE_ARR[dayIdxArr[0]]}]\n`
                  content += `(${result}) ${tropy}개 ${points}점`
                }
              }

              return (
                <td key={`${rowIdx}_${colIdx}`} className={CN}>
                  {content}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}
