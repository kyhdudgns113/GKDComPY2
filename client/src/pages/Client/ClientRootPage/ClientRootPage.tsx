import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import '../_style/_CommonStyles.scss'
import './_style/ClientRootPage.scss'

type ClientRootPageProps = DivCommonProps & {}

export const ClientRootPage: FC<ClientRootPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`ClientRoot_Page ClientPages ${className || ''}`} style={style} {...props}>
      <div className="_container_page">
        {/* 1. 타이틀 */}
        <p className="_title_page">컴프야 클럽 매니저에 오신것을 환영합니다</p>
      </div>
    </div>
  )
}
