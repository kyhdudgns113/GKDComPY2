import {useState, useEffect} from 'react'

import {useDocumentStates, useDocumentActions, useAppDispatch, useClubStates} from '@store'
import {useDocumentCallbacksContext} from '@context'

import {DocEditButton, DocLoadButton} from '../buttons'
import {DocumentContentPart} from '../parts'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'
import type {ClubType} from '@shareType'

import '../_style/ClubDocSubPage.scss'

type ClubDocSubPageProps = DivCommonProps & {club: ClubType}

export const ClubDocSubPage: FC<ClubDocSubPageProps> = ({club, className, style, ...props}) => {
  const {docContents} = useDocumentStates()
  const {clubOpened} = useClubStates()
  const {loadClubDocument} = useDocumentCallbacksContext()
  const {resetDocContents} = useDocumentActions()

  const [contents, setContents] = useState<string>(docContents)

  const dispatch = useAppDispatch()

  // 초기화: 문서 내용 불러오기
  useEffect(() => {
    if (!clubOpened || clubOpened.clubOId === '') {
      return
    }

    loadClubDocument(clubOpened.clubOId)

    return () => {
      dispatch(resetDocContents())
    }
  }, [clubOpened, loadClubDocument, dispatch]) // eslint-disable-line react-hooks/exhaustive-deps

  // 초기화: contents 를 문서 초기 내용으로
  useEffect(() => {
    setContents(docContents)
  }, [docContents])

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
