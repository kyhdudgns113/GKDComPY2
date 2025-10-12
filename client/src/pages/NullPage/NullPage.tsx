import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type NullPageProps = DivCommonProps & {}

export const NullPage: FC<NullPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`Null_Page ${className || ''}`} style={style} {...props}>
      <p>존재하지 않거나 미구현된 페이지에요</p>
    </div>
  )
}
