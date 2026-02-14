import {useCallback} from 'react'

import {useAppDispatch, useRecordActions, useRecordStates} from '@store'

import type {FC, MouseEvent} from 'react'

import type {DivCommonProps} from '@prop'

import '../_styles/BTN_ShowRecord.scss'

type ShowRecordButtonProps = DivCommonProps & {}

export const ShowRecordButton: FC<ShowRecordButtonProps> = ({...props}) => {
  const {showModeRecord} = useRecordStates()
  const {openShowModeRecord} = useRecordActions()

  const dispatch = useAppDispatch()

  const onClickShowRecord = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    dispatch(openShowModeRecord())
  }, []) // eslint-disable-line

  return (
    <div
      className={`ShowRecord_Button ${showModeRecord === 'record' ? '_on' : '_off'}`}
      onClick={onClickShowRecord}
      {...props} // ::
    >
      기록 화면
    </div>
  )
}
