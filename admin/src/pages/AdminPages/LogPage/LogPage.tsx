import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type LogPageProps = DivCommonProps & {}

export const LogPage: FC<LogPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`Log_Page _page ${className || ''}`} style={style} {...props}>
      <p>Log Page</p>
    </div>
  )
}
