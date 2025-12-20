import {useCallback} from 'react'

import {useAppSelector} from '@store'
import {useMemberCallbacksContext} from '@context'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

import * as ST from '@shareType'

import './SaveDataBtn.scss'

type SaveDataBtnProps = ButtonCommonProps & {}

export const SaveDataBtn: FC<SaveDataBtnProps> = ({className, ...props}) => {
  const community = useAppSelector(state => state.Community.community)
  const eMembers = useAppSelector(state => state.EMember.eMembers)
  const {saveEMembers} = useMemberCallbacksContext()

  const onClickSave = useCallback(
    (commOId: string, eMembers: {[clubOId: string]: ST.EMemberType[]}) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!commOId) {
        alert('공동체 정보가 없습니다.')
        return
      }

      saveEMembers(commOId, eMembers) // ::
        .then(success => {
          if (success) {
            alert('데이터가 저장되었습니다.')
          }
        })
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <button className={`SaveData_Btn ${className || ''}`} onClick={onClickSave(community.commOId, eMembers)} {...props}>
      저장
    </button>
  )
}
