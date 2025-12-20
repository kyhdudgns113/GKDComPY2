import {useCallback} from 'react'

import {useAppDispatch, useAppSelector, useEMemberActions} from '@store'

import type {FC, MouseEvent} from 'react'
import type {ButtonCommonProps} from '@prop'

import './ResetDataBtn.scss'

import * as ST from '@shareType'

type ResetDataBtnProps = ButtonCommonProps & {}

export const ResetDataBtn: FC<ResetDataBtnProps> = ({className, ...props}) => {
  const commMemberArr = useAppSelector(state => state.Community.commMemberArr)

  const setEMembersFromArr = useEMemberActions().setEMembersFromArr

  const dispatch = useAppDispatch()

  const onClickReset = useCallback(
    (commMemberArr: ST.MemberType[]) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      dispatch(setEMembersFromArr(commMemberArr))
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <button className={`ResetData_Btn ${className || ''}`} onClick={onClickReset(commMemberArr)} {...props}>
      리셋
    </button>
  )
}
