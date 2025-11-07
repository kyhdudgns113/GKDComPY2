import {useCallback, useEffect, useRef} from 'react'

import {useDocumentCallbacksContext} from '@context'
import {useDocumentStates, useAppDispatch, useDocumentActions, useCommunityStates} from '@store'

import type {ChangeEvent, FC} from 'react'
import type {DivCommonProps} from '@prop'

import './DocContentsPart.scss'

type DocContentsPartProps = DivCommonProps & {}

export const DocContentsPart: FC<DocContentsPartProps> = ({className, ...props}) => {
  const {community} = useCommunityStates()
  const {docContents} = useDocumentStates()
  const {setDocContents} = useDocumentActions()
  const {loadCommDocument} = useDocumentCallbacksContext()

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const dispatch = useAppDispatch()

  const onChangeContents = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setDocContents(e.currentTarget.value))
    },
    [dispatch] // eslint-disable-line react-hooks/exhaustive-deps
  )

  useEffect(() => {
    if (!community.commOId) return

    loadCommDocument(community.commOId)
  }, [community]) // eslint-disable-line react-hooks/exhaustive-deps

  // 자동 변경: docContents 가 변경되면 textarea 의 height 를 조정한다.
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [docContents]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`DocContents_Part ${className || ''}`} {...props}>
      <textarea autoFocus className="_contents_editor" onChange={onChangeContents} ref={textareaRef} value={docContents} />
    </div>
  )
}
