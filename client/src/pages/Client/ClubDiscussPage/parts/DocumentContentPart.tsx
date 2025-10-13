import {useRef, useCallback} from 'react'

import type {FC, MouseEvent} from 'react'
import type {DivCommonProps} from '@prop'
import type {Setter} from '@type'

type DocumentContentPartProps = DivCommonProps & {
  setter: Setter<string>
  value: string
}

export const DocumentContentPart: FC<DocumentContentPartProps> = ({setter, value, className, style, ...props}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const onClickContainer = useCallback((e: MouseEvent<HTMLDivElement>) => {
    // Focus 가 중복으로 가지 않도록 한다.
    if (e.currentTarget.tagName === 'TEXTAREA') {
      return
    }

    textareaRef.current?.focus()
  }, [])

  return (
    <div className={`DocumentContent_Part ${className || ''}`} style={style} {...props}>
      <div className="_textarea_container" onClick={onClickContainer}>
        <textarea className="_textarea_contents" onChange={e => setter(e.currentTarget.value)} ref={textareaRef} value={value} />
      </div>
    </div>
  )
}
