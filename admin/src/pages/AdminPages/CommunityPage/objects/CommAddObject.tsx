import {useCallback, useState} from 'react'
import {useCommunityCallbacksContext} from '@context'

import type {FC, FocusEvent, KeyboardEvent} from 'react'
import type {InputCommonProps} from '@prop'
import type {Setter} from '@type'

type CommAddObjectProps = InputCommonProps & {
  setter: Setter<boolean>
}

export const CommAddObject: FC<CommAddObjectProps> = ({setter, className, style, ...props}) => {
  const {addCommunity} = useCommunityCallbacksContext()

  const [commName, setCommName] = useState<string>('')

  const _executeAdd = useCallback((commName: string) => {
    if (!commName || commName.trim() === '') {
      setter(false)
      return
    }

    addCommunity(commName) // ::
      .then(res => {
        if (res) {
          alert(`공동체: ${commName} 생성 완료`)
          setter(false)
        }
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onBlurInput = useCallback(
    (commName: string) => (e: FocusEvent<HTMLInputElement>) => {
      e.stopPropagation()
      _executeAdd(commName)
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const onKeyDownInput = useCallback(
    (commName: string) => (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case 'Enter':
          _executeAdd(commName)
          setCommName('')
          break
        case 'Escape':
          setCommName('')
          setter(false)
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <input
      autoFocus
      className={`CommAdd_Object ${className || ''}`}
      onBlur={onBlurInput(commName)}
      onChange={e => setCommName(e.target.value)}
      onKeyDown={onKeyDownInput(commName)}
      placeholder="새 공동체 이름"
      style={style}
      value={commName}
      {...props} // ::
    />
  )
}
