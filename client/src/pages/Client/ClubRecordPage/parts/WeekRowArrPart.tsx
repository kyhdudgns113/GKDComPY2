import {useNavigate} from 'react-router-dom'

import {useCallback} from 'react'
import {useClubStates, useRecordStates} from '@store'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/Part_WeekRowArr.scss'

type WeekRowArrPartProps = DivCommonProps & {}

export const WeekRowArrPart: FC<WeekRowArrPartProps> = ({className, style, ...props}) => {
  const {clubOpened} = useClubStates()
  const {weekOIdOpened, weekRowArr} = useRecordStates()

  const navigate = useNavigate()

  const onClickWeekRow = useCallback(
    (clubOId: string, weekOId: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (weekOId === '') {
        return
      }
      navigate(`/client/club/record/${clubOId}/${weekOId}`)
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className={`WeekRowArr_Part ${className || ''}`} style={style} {...props}>
      <div className="_arr_container_part">
        {weekRowArr.map((weekRow, rowIdx) => {
          const isOpened = weekOIdOpened === weekRow.weekOId
          return (
            <button
              className={`_week_row ${isOpened ? '_opened' : ''}`}
              key={rowIdx}
              onClick={onClickWeekRow(clubOpened.clubOId, weekRow.weekOId)} // ::
            >
              {weekRow.title}
            </button>
          )
        })}
      </div>
    </div>
  )
}
