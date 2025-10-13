import {useState, useEffect} from 'react'

import {useClubStates} from '@store'

import {DocEditButton, DocLoadButton} from '../buttons'
import {DocumentContentPart} from '../parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

import '../_style/ClubDocSubPage.scss'

type ClubDocSubPageProps = DivCommonProps & {club: ClubType}

export const ClubDocSubPage: FC<ClubDocSubPageProps> = ({club, className, style, ...props}) => {
  const {clubDocContents} = useClubStates()

  const [contents, setContents] = useState<string>(clubDocContents)

  // 초기화: contents 를 문서 초기 내용으로
  useEffect(() => {
    setContents(clubDocContents)
  }, [clubDocContents])

  return (
    <div className={`ClubDoc_SubPage ${className || ''}`} style={style} {...props}>
      {/* 1. 타이틀 */}
      <p className="_title_subpage">{club.clubName} 기록지</p>

      {/* 2. 버튼 행 (수정하기, 불러오기) */}
      <div className="_button_row_subpage">
        <DocEditButton club={club} contents={contents} />
        <DocLoadButton club={club} />
      </div>

      {/* 2. 문서 컨테이너 */}
      <DocumentContentPart setter={setContents} value={contents} />
    </div>
  )
}
