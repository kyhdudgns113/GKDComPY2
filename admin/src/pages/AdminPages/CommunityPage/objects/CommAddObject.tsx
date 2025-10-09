import {useState} from 'react'

import type {FC} from 'react'
import type {InputCommonProps} from '@prop'

type CommAddObjectProps = InputCommonProps & {}

export const CommAddObject: FC<CommAddObjectProps> = ({className, style, ...props}) => {
  const [commName, setCommName] = useState<string>('')

  return (
    <input
      className={`CommAdd_Object ${className || ''}`}
      onChange={e => setCommName(e.target.value)}
      placeholder="새 공동체 이름"
      style={style}
      value={commName}
      {...props} // ::
    />
  )
}
