import {useAppSelector} from '@store'

import {useCallback, useState} from 'react'

import type {DragEvent, FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {EMemberType} from '@shareType'

import './EMemberRowObj.scss'

type EMemberRowObjProps = Omit<DivCommonProps, 'style'> & {
  clubOId: string
  eMember: EMemberType
  onDragOver: (e: DragEvent<HTMLDivElement>) => void
  onDragEnter: (e: DragEvent<HTMLDivElement>) => void
  onDragLeave: (e: DragEvent<HTMLDivElement>) => void
  onDrop: (e: DragEvent<HTMLDivElement>) => void
  posIdx: number
}

/* eslint-disable */
export const EMemberRowObj: FC<EMemberRowObjProps> = ({
  clubOId,
  eMember,
  onDragOver,
  onDragEnter,
  onDragLeave,
  onDrop,
  posIdx,
  className,
  ...props
}) => {
  const {memName, batterPower, pitcherPower} = eMember
  const totalPower = batterPower + pitcherPower

  const clubArr = useAppSelector(state => state.Community.clubArr)
  const numClubs = clubArr.length + 1 // 클럽수 + 후보군 (탈퇴는 안 셈)
  const colorIdx = (clubArr.findIndex(club => club.clubOId === eMember.prevClubOId) + numClubs) % numClubs
  const angle = Math.floor(360 / numClubs) * colorIdx

  const cnBw2 = posIdx % 5 === 4 ? '_bw_4' : ''
  const cnBgAngle = `block_bg_angle_${angle}`

  const [isDragging, setIsDragging] = useState(false)

  const onDragStart = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      setIsDragging(true)
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', JSON.stringify({prevClubOId: clubOId, memName}))
    },
    [clubOId, memName]
  )

  const onDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <div
      className={`EMemberRow_Obj ${cnBw2} ${cnBgAngle} ${isDragging ? '_dragging' : ''} ${className || ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      {...props}
    >
      <p className="_name_row _width_name_part">{memName}</p>
      <p className="_batter_row _width_batter_part">{batterPower.toLocaleString()}</p>
      <p className="_pitcher_row _width_pitcher_part">{pitcherPower.toLocaleString()}</p>
      <p className="_total_row _width_total_part">{totalPower.toLocaleString()}</p>
    </div>
  )
}
