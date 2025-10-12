import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ClientMainPageProps = DivCommonProps & {}

export const ClientMainPage: FC<ClientMainPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`ClientMain_Page ${className || ''}`} style={style} {...props}>
      ClientMainPage
    </div>
  )
}
