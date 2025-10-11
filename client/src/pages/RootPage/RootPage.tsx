import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type RootPageProps = DivCommonProps & {}

export const RootPage: FC<RootPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`Root_Page ${className || ''}`} style={style} {...props}>
      <p>페이지 로딩중이에요...</p>
    </div>
  )
}
