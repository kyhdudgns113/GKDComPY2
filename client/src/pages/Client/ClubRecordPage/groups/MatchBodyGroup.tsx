import {useCallback, useEffect, useState} from 'react'

import {useClubStates, useRecordStates} from '@store'

import type {FC} from 'react'
import type {TableBodyCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Grp_MatchBody.scss'

type MatchBodyGroupProps = TableBodyCommonProps & {
  weekRow: WeekRowType
}

/* eslint-disable */
type BlockInfoType = {
  /**
   * dayIdxArr
   * - 해당 블록이 저장된 날짜의 인덱스의 목록을 넣는다.
   * - 중복으로 기록될 수 있어서이다.
   */
  dayIdxArr: number[]
  result: '승' | '무' | '패' | '?' | 'x'
  tropy: number
  points: number
}

export const MatchBodyGroup: FC<MatchBodyGroupProps> = ({weekRow, className, style, ...props}) => {
  const {clubOpened} = useClubStates()
  const {dateInfoArr} = useRecordStates()

  const dateArr = ['월', '화', '수', '목', '금', '토']

  const [blockMatrix, setBlockMatrix] = useState<BlockInfoType[][]>(
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

  // 초기화: 데이터 블록 배열
  useEffect(() => {
    const newBlockMatrix = Array.from({length: 6}, () =>
      Array.from({length: 6}, () => {
        return {
          dayIdxArr: [],
          result: '?',
          tropy: 0,
          points: 0
        } as BlockInfoType
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

  return (
    <tbody className={`MatchBody_Group ${className || ''}`} style={style} {...props}>
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
