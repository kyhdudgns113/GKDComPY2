import {useCallback} from 'react'

import {useRecordCallbacksContext} from '@context'
import {useClubStates} from '@store'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

import '../_styles/BTN_AddWeeks.scss'

type AddPrevWeekButtonProps = ButtonCommonProps & {}

export const AddPrevWeekButton: FC<AddPrevWeekButtonProps> = ({className, style, ...props}) => {
  const {addPrevWeek} = useRecordCallbacksContext()
  const {clubOpened} = useClubStates()

  const onClickPrev = useCallback(
    (clubOId: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (clubOId === '') {
        return
      }

      addPrevWeek(clubOId) // ::
        .then(res => {
          if (res) {
            alert('이전 주차가 추가되었습니다.')
          }
        })
    },
    [addPrevWeek]
  )

  return (
    <button
      className={`AddPrevWeek_Button AddWeek_Button ${className || ''}`}
      onClick={onClickPrev(clubOpened.clubOId)}
      style={style}
      {...props} // ::
    >
      이전 추가
    </button>
  )
}
