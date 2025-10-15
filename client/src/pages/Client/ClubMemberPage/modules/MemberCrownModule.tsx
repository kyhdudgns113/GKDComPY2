import {useCallback, useEffect, useState} from 'react'

import {Person} from '@component'
import {useAppDispatch, useMemberActions, useMemberStates} from '@store'

import {GoldCrown, SilverCrown} from '../components'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {MemberType} from '@shareType'

import * as SV from '@shareValue'

import '../_styles/MemberCrownModule.scss'

type MemberCrownModuleProps = DivCommonProps & {}

export const MemberCrownModule: FC<MemberCrownModuleProps> = ({className, style, ...props}) => {
  const {clubMemberOpened} = useMemberStates()
  const {setClubMemberOpened} = useMemberActions()

  const [position, setPosition] = useState<number>(SV.MEMBER_POSITION_NORMAL)

  const dispatch = useAppDispatch()

  const onClickButton = useCallback(
    (member: MemberType, position: number) => (e: MouseEvent<HTMLImageElement>) => {
      e.stopPropagation()

      const newMember = {...member, position: position}

      dispatch(setClubMemberOpened(newMember))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  useEffect(() => {
    setPosition(clubMemberOpened.position)
  }, [clubMemberOpened])

  return (
    <div className={`MemberCrown_Module ${className || ''}`} style={style} {...props}>
      <GoldCrown
        className={`_button_module ${position === SV.MEMBER_POSITION_GOLD ? '_selected' : ''}`}
        onClick={onClickButton(clubMemberOpened, SV.MEMBER_POSITION_GOLD)} // ::
      />
      <SilverCrown
        className={`_button_module ${position === SV.MEMBER_POSITION_SILVER ? '_selected' : ''}`}
        onClick={onClickButton(clubMemberOpened, SV.MEMBER_POSITION_SILVER)} // ::
      />
      <Person
        className={`_button_module _bottom_btn ${position === SV.MEMBER_POSITION_NORMAL ? '_selected' : ''}`}
        onClick={onClickButton(clubMemberOpened, SV.MEMBER_POSITION_NORMAL)} // ::
      />
    </div>
  )
}
