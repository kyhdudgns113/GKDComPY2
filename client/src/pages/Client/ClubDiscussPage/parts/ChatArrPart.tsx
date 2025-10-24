import {Fragment, useEffect} from 'react'
import {useAuthStatesContext, useChatStatesContext} from '@context'
import {useChatStates} from '@store'

import {ChatPrevLoadButton} from '../buttons'
import {ChatDateObject, ChatMyObject, ChatOtherObject} from '../objects'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ChatArrPartProps = DivCommonProps & {}

export const ChatArrPart: FC<ChatArrPartProps> = ({className, style, ...props}) => {
  const {chatArr} = useChatStates()
  const {userOId} = useAuthStatesContext()
  const {chatArrDivRef} = useChatStatesContext()

  const isLoadButton = chatArr.length > 0 && chatArr[0].chatIdx > 0

  let lastUserOId = ''
  let lastDateValue = new Date(0).valueOf()
  let lastMinute = -1
  let lastYMD = 0

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
      {isLoadButton && <ChatPrevLoadButton />}

      {chatArr.map((chat, idx) => {
        const returnArr = []

        const chatDate = new Date(chat.date)

        const chatYMD = chatDate.getFullYear() * 10000 + (chatDate.getMonth() + 1) * 100 + chatDate.getDate()

        const isSameUserWithLast = chat.userOId === lastUserOId
        const isSameMinute = chatDate.getMinutes() === lastMinute
        const isSimilarTime = chatDate.valueOf() - lastDateValue < 1000 * 60 * 3
        const isSameYMD = chatYMD === lastYMD

        const isSameArea = isSameUserWithLast && isSameMinute && isSimilarTime

        lastUserOId = chat.userOId
        lastDateValue = chatDate.valueOf()
        lastMinute = chatDate.getMinutes()
        lastYMD = chatYMD

        if (!isSameYMD) {
          returnArr.push(<ChatDateObject key={idx} date={chatDate} />)
        }

        if (chat.userOId === userOId) {
          returnArr.push(<ChatMyObject chat={chat} />)
        } // ::
        else {
          returnArr.push(<ChatOtherObject chat={chat} isSameArea={isSameArea} />)
        }

        return <Fragment key={idx}>{returnArr}</Fragment>
      })}
    </div>
  )
}
