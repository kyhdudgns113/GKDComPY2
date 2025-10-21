import {useCallback} from 'react'

import {useRecordCallbacksContext} from '@context'
import {useClubStates} from '@store'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

import '../_styles/BTN_AddWeeks.scss'

type AddNextWeekButtonProps = ButtonCommonProps & {}

export const AddNextWeekButton: FC<AddNextWeekButtonProps> = ({className, style, ...props}) => {
  const {addNextWeek} = useRecordCallbacksContext()
  const {clubOpened} = useClubStates()

  const onClickNext = useCallback(
    (clubOId: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (clubOId === '') {
        return
      }

      addNextWeek(clubOId) // ::
        .then(res => {
          if (res) {
            alert('다음 주차가 추가되었습니다.')
          }
        })
    },
    [addNextWeek]
  )

  return (
    <button
      className={`AddNextWeek_Button AddWeek_Button ${className || ''}`}
      onClick={onClickNext(clubOpened.clubOId)}
      style={style}
      {...props} // ::
    >
      다음 추가
    </button>
  )
}
