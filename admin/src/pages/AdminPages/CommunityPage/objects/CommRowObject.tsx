import {useCallback} from 'react'
import {useDispatch} from 'react-redux'

import {useAppSelector} from '@store'
import {selectCommOIdSelected, selectCommunity} from '@store'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {CommunityType} from '@shareType'

type CommRowObjectProps = DivCommonProps & {
  community: CommunityType
}

export const CommRowObject: FC<CommRowObjectProps> = ({community, className, style, ...props}) => {
  const dispatch = useDispatch()

  const commOIdSelected = useAppSelector(selectCommOIdSelected)

  const onClickCommRowObject = useCallback(
    (community: CommunityType) => (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      dispatch(selectCommunity(community))
    },
    [dispatch]
  )

  return (
    <div
      className={`CommRow_Object ${commOIdSelected === community.commOId ? '_selected' : ''} ${className || ''}`}
      onClick={onClickCommRowObject(community)}
      style={style}
      {...props} // ::
    >
      {community.commName}
    </div>
  )
}
