import {useEffect} from 'react'

import {useRecordCallbacksContext} from '@context'
import {useClubStates} from '@store'

import {AddNextWeekButton, AddPrevWeekButton} from '../buttons'

import {WeekRowArrPart} from '../parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_styles/SP_WeekRowList.scss'

type WeekRowListSubPageProps = DivCommonProps & {}

export const WeekRowListSubPage: FC<WeekRowListSubPageProps> = ({className, style, ...props}) => {
  const {clubOpened} = useClubStates()
  const {loadClubWeekRowArr} = useRecordCallbacksContext()

  // 초기화: 주차 목록 불러오기
  useEffect(() => {
    /**
     * 이 서브페이지가 로딩될때 주차 목록을 불러와야 한다
     * context 에서 해버리면 클럽회의록 열때도 로딩이 되어버린다.
     */
    if (!clubOpened || clubOpened.clubOId === '') {
      return
    }

    loadClubWeekRowArr(clubOpened.clubOId)
  }, [clubOpened, loadClubWeekRowArr])

  return (
    <div className={`WeekRowList_SubPage ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 블록 */}
      <div className="_title_block_subpage">
        <p className="_title_subpage">주차별 기록</p>
      </div>

      {/* 2. 버튼: 새 주차 생성 */}
      <AddNextWeekButton />

      {/* 3. 목록: 주차 목록 */}
      <WeekRowArrPart />

      {/* 4. 버튼: 이전 주차 생성 */}
      <AddPrevWeekButton />
    </div>
  )
}
