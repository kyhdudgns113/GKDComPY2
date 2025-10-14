import {useEffect} from 'react'
import {useAuthStatesContext, useChatStatesContext} from '@context'
import {useChatStates} from '@store'

import {ChatMyObject, ChatOtherObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ChatArrPartProps = DivCommonProps & {}

export const ChatArrPart: FC<ChatArrPartProps> = ({className, style, ...props}) => {
  const {chatArr} = useChatStates()
  const {userOId} = useAuthStatesContext()
  const {chatArrDivRef} = useChatStatesContext()

  let lastUserOId = ''
  let lastDateValue = new Date(0).valueOf()
  let lastMinute = 0

  // 상위 컴포넌트 스크롤 안되게 하기
  useEffect(() => {
    const el = chatArrDivRef.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      const isAtTop = el.scrollTop === 0
      const isAtBottom = el.scrollTop + el.clientHeight === el.scrollHeight
      const scrollingUp = e.deltaY < 0
      const scrollingDown = e.deltaY > 0

      if ((scrollingUp && isAtTop) || (scrollingDown && isAtBottom)) {
        e.preventDefault() // 이제 진짜로 body 스크롤 안 됨
      }
    }

    el.addEventListener('wheel', handleWheel, {passive: false})
    return () => el.removeEventListener('wheel', handleWheel)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`ChatArr_Part ${className || ''}`} style={style} {...props} ref={chatArrDivRef}>
      {chatArr.map((chat, idx) => {
        const chatDate = new Date(chat.date)

        const isSameUserWithLast = chat.userOId === lastUserOId
        const isSameMinute = chatDate.getMinutes() === lastMinute
        const isSimilarTime = chatDate.valueOf() - lastDateValue < 1000 * 60 * 3

        const isSameArea = isSameUserWithLast && isSameMinute && isSimilarTime

        lastUserOId = chat.userOId
        lastDateValue = chatDate.valueOf()
        lastMinute = chatDate.getMinutes()

        if (chat.userOId === userOId) {
          return <ChatMyObject chat={chat} key={idx} />
        } // ::
        else {
          return <ChatOtherObject chat={chat} isSameArea={isSameArea} key={idx} />
        }
      })}
    </div>
  )
}
