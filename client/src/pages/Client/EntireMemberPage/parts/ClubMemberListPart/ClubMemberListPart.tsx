import {useAppSelector, useAppDispatch, useEMemberActions} from '@store'

import {useCallback} from 'react'

import {ArrHeaderObj, EMemberRowObj} from '../../objects'
import type {DragEvent, FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {EMemberType} from '@shareType'

import * as NV from '@nullValue'

import './ClubMemberListPart.scss'

type ClubMemberListPartProps = DivCommonProps & {
  clubOId: string
  colorIdx: number
}

export const ClubMemberListPart: FC<ClubMemberListPartProps> = ({clubOId, colorIdx, ...props}) => {
  const clubArr = useAppSelector(state => state.Community.clubArr)
  const eMemberArr = useAppSelector(state => state.EMember.eMembers[clubOId] || [])
  const numClubs = clubArr.length + 1 // 클럽수 + 후보군 (탈퇴는 안 셈)
  const angle = Math.floor(360 / numClubs) * colorIdx

  const club = clubArr.find(club => club.clubOId === clubOId) || NV.NULL_CLUB()
  const clubName = club.clubName || '후보군'

  const cnAngle = `block_angle_${angle}`

  const dispatch = useAppDispatch()
  const {moveEMember} = useEMemberActions()

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    e.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (dropIdx: number | null, targetClubOId: string, targetEMemberArr: EMemberType[]) => (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()

      try {
        const {memName, prevClubOId} = JSON.parse(e.dataTransfer.getData('text/plain'))

        if (prevClubOId === targetClubOId && dropIdx !== null) {
          // 같은 클럽 내에서 이동하는 경우
          const currentIdx = targetEMemberArr.findIndex(m => m.memName === memName)
          if (currentIdx === -1) {
            return
          }
          // 같은 위치면 이동하지 않음
          if (currentIdx === dropIdx) {
            return
          }
          // 현재 위치보다 뒤로 이동하는 경우, 제거 후 인덱스가 하나씩 앞당겨지므로 -1
          const adjustedIdx = currentIdx < dropIdx ? dropIdx - 1 : dropIdx
          dispatch(moveEMember({prevClubOId, memName, newClubOId: targetClubOId, newIdx: adjustedIdx}))
        } // ::
        else {
          // 다른 클럽으로 이동하거나 빈 공간에 드롭
          dispatch(moveEMember({prevClubOId, memName, newClubOId: targetClubOId, newIdx: dropIdx}))
        }
      } catch (err) {
        // 드래그 데이터가 없거나 잘못된 경우 무시
        console.error('드롭 처리 중 오류:', err)
      }
    },
    [dispatch, moveEMember]
  )

  const onDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  return (
    <div
      className={`ClubMemberList_Part ${cnAngle}`}
      onDragOver={onDragOver}
      onDrop={onDrop(null, clubOId, eMemberArr)}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      {...props} // ::
    >
      {/* 1. 타이틀 */}
      <p className="_title_part">{clubName}</p>

      {/* 2. 배열 헤더 */}
      <ArrHeaderObj clubOId={clubOId} className={cnAngle} />

      {/* 3. 멤버행 배열 */}
      {eMemberArr.map((eMember, eMemberIdx) => (
        <EMemberRowObj
          clubOId={clubOId}
          eMember={eMember}
          key={eMemberIdx}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop(eMemberIdx, clubOId, eMemberArr)}
          posIdx={eMemberIdx}
        />
      ))}
    </div>
  )
}
