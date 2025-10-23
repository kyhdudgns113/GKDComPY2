import {useEffect} from 'react'

import {useMemberCallbacksContext} from '@context'
import {useAppDispatch, useClubStates, useMemberActions} from '@store'

import {AddMemberButton} from '../buttons'
import {MemberTablePart} from '../parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/MemberListSubpage.scss'

type MemberListSubpageProps = DivCommonProps & {}

export const MemberListSubpage: FC<MemberListSubpageProps> = ({className, style, ...props}) => {
  const {clubOpened} = useClubStates()
  const {resetClubMemberArr} = useMemberActions()
  const {loadClubMemberArr} = useMemberCallbacksContext()
  const dispatch = useAppDispatch()

  // 초기화: 멤버 목록 불러오기
  useEffect(() => {
    /**
     * 이 서브페이지가 로딩될때 멤버를 불러와야 한다
     * context 에서 해버리면 클럽회의록 열때도 로딩이 되어버린다.
     */
    if (!clubOpened || clubOpened.clubOId === '') {
      return
    }

    loadClubMemberArr(clubOpened.clubOId)

    return () => {
      dispatch(resetClubMemberArr())
    }
  }, [clubOpened, dispatch, loadClubMemberArr]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`MemberList_Subpage ${className || ''}`} style={style} {...props}>
      <div className="_header_member_list">
        {/* 1. 타이틀 */}
        <p className="_title_subpage">{clubOpened.clubName} 멤버</p>

        {/* 2. 멤버 추가 버튼 */}
        <AddMemberButton />
      </div>

      {/* 3. 멤버 목록 */}
      <MemberTablePart />
    </div>
  )
}
