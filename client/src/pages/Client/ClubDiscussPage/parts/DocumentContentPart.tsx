import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type DocumentContentPartProps = DivCommonProps & {}

export const DocumentContentPart: FC<DocumentContentPartProps> = ({className, style, ...props}) => {
  return (
    <div className={`DocumentContent_Part ${className || ''}`} style={style} {...props}>
      <p className="_title_part">문서 내용</p>
    </div>
  )
}
