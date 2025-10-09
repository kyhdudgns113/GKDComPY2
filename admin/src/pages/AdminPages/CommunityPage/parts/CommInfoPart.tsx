import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type CommInfoPartProps = DivCommonProps & {}

export const CommInfoPart: FC<CommInfoPartProps> = ({className, style, ...props}) => {
  return (
    <div className={`CommInfo_Part ${className || ''}`} style={style} {...props}>
      <p className="_title_part">공동체 정보</p>
    </div>
  )
}
