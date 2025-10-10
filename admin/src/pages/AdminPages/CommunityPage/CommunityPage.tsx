import {useEffect} from 'react'

import {useCommunityCallbacksContext} from '@context'
import {useAppSelector} from '@store'
import {selectCommOIdSelected} from '@store'

import {CommListPart, CommInfoPart} from './parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_styles/CommunityPage.scss'

type CommunityPageProps = DivCommonProps & {}

export const CommunityPage: FC<CommunityPageProps> = ({className, style, ...props}) => {
  const {loadCommArr} = useCommunityCallbacksContext()

  const commOIdSelected = useAppSelector(selectCommOIdSelected)

  // commArr 불러오기
  useEffect(() => {
    loadCommArr()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`Community_Page _page ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_page">공동체 관리</p>

      <div className="_page_container">
        {/* 2. 공동체 목록 */}
        <CommListPart />

        {/* 3. 공동체 정보 */}
        {commOIdSelected && <CommInfoPart />}
      </div>
    </div>
  )
}
