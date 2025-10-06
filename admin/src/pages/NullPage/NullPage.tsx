import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type NullPageProps = DivCommonProps & {}

export const NullPage: FC<NullPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`Null_Page ${className}`} style={style} {...props}>
      <p>NullPage</p>
    </div>
  )
}
