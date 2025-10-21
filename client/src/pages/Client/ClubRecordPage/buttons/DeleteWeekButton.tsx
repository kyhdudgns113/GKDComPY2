import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useRecordCallbacksContext} from '@context'
import {useClubStates, useRecordStates} from '@store'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/BTN_DeleteWeek.scss'

type DeleteWeekButtonProps = DivCommonProps & {}

export const DeleteWeekButton: FC<DeleteWeekButtonProps> = ({className, style, ...props}) => {
  const {clubOpened} = useClubStates()
  const {weekOIdOpened, weekRowArr} = useRecordStates()
  const {removeWeekRow} = useRecordCallbacksContext()

  const navigate = useNavigate()

  const arrLen = weekRowArr.length
  const isLast = weekOIdOpened === weekRowArr[arrLen - 1].weekOId
  const isFirst = weekOIdOpened === weekRowArr[0].weekOId

  const onClickDelete = useCallback(
    (clubOId: string, weekOId: string) => (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      if (!weekOId) {
        return
      }

      if (confirm('주차를 삭제하시겠습니까?')) {
        removeWeekRow(weekOId) // ::
          .then(res => {
            if (res) {
              alert('주차가 삭제되었습니다.')
              navigate(`/client/club/record/${clubOId}`)
            }
          })
      }
    },
    [removeWeekRow] // eslint-disable-line react-hooks/exhaustive-deps
  )

  if (!isLast && !isFirst) {
    return null
  }

  return (
    <div
      className={`DeleteWeek_Button ${className || ''}`}
      onClick={onClickDelete(clubOpened.clubOId, weekOIdOpened)}
      style={style}
      {...props} // ::
    >
      삭제
    </div>
  )
}
