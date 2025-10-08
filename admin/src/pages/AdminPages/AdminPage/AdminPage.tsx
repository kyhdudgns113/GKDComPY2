import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type AdminPageProps = DivCommonProps & {}

export const AdminPage: FC<AdminPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`Admin_Page _page flex flex-col  ${className || ''}`} style={style} {...props}>
      <p>Admin Page</p>
    </div>
  )
}
