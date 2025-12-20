import {useCallback} from 'react'

import {useAppSelector} from '@store'
import {useMemberCallbacksContext} from '@context'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

import './LoadDataBtn.scss'

type LoadDataBtnProps = ButtonCommonProps & {}

export const LoadDataBtn: FC<LoadDataBtnProps> = ({className, ...props}) => {
  const community = useAppSelector(state => state.Community.community)
  const {loadEMembers} = useMemberCallbacksContext()

  const onClickLoad = useCallback(
    (commOId: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!commOId) {
        alert('공동체 정보가 없습니다.')
        return
      }

      loadEMembers(commOId) // ::
        .then(success => {
          if (success) {
            alert('데이터를 불러왔습니다.')
          }
        })
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <button className={`LoadData_Btn ${className || ''}`} onClick={onClickLoad(community.commOId)} {...props}>
      로드
    </button>
  )
}
