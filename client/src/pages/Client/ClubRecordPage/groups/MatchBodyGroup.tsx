import {useCallback} from 'react'

import {useClubStates, useRecordStates} from '@store'

import type {FC} from 'react'
import type {TableBodyCommonProps} from '@prop'

import * as ST from '@shareType'
import * as T from '@type'

import '../_styles/Grp_MatchBody.scss'

type MatchBodyGroupProps = TableBodyCommonProps & {
  blockMatrix: T.MatchBlockInfoType[][]
  weekRow: ST.WeekRowType
}

/* eslint-disable */

export const MatchBodyGroup: FC<MatchBodyGroupProps> = ({blockMatrix, weekRow, ...props}) => {
  const {clubOpened} = useClubStates()
  const {dateInfoArr} = useRecordStates()

  const dateArr = ['월', '화', '수', '목', '금', '토']

  const _getClubName = useCallback(
    (dayIdx: number) => {
      if (dayIdx === -1) {
        return clubOpened.clubName
      } // ::
      else {
        return dateInfoArr?.[dayIdx]?.enemyName || `${dateArr[dayIdx]} 상대`
      }
    },
    [clubOpened, dateInfoArr]
  )

  return (
    <tbody className={`MatchBody_Group `} {...props}>
      {[-1, 0, 1, 2, 3, 4].map((dayIdx, rowIdx) => {
        return (
          <tr key={dayIdx}>
            {/* 1. 클럽 이름 */}
            <td className="_td_club_name">{_getClubName(dayIdx)}</td>

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
                const {dayIdxArr, result, tropy, points} = blockMatrix[rowIdx][colIdx]
                if (dayIdxArr.length > 1) {
                  CN += ' _duplicate '
                  content = '데이터 중복\n'
                  content += `[${dayIdxArr.map(dayIdx => dateArr[dayIdx]).join(', ')}]`
                } // ::
                else if (dayIdxArr.length === 1) {
                  if (result === '승') {
                    CN += ' _win '
                  } // ::
                  else if (result === '패') {
                    CN += ' _lose '
                  }

                  content += `[${dateArr[dayIdxArr[0]]}]\n`
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
