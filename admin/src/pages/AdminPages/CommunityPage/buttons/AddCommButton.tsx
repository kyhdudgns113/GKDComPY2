import {useCallback} from 'react'
import {Icon} from '@component'

import type {FC, MouseEvent} from 'react'
import type {SpanCommonProps} from '@prop'
import type {Setter} from '@type'

type AddCommButtonProps = SpanCommonProps & {setter: Setter<boolean>}

export const AddCommButton: FC<AddCommButtonProps> = ({setter, className, style, ...props}) => {
  const onClickIconAdd = useCallback((e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    setter(true)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <Icon iconName="add" className={`AddComm_Button ${className || ''}`} onClick={onClickIconAdd} style={style} {...props} />
}
