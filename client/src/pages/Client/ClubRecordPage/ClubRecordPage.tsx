import {RecordSubPage, WeekRowListSubPage} from './subpages'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './_styles/_ClubRecordPage.scss'

type ClubRecordPageProps = DivCommonProps & {}

export const ClubRecordPage: FC<ClubRecordPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`ClubRecord_Page CliengPages ${className || ''}`} style={style} {...props}>
      <div className="_container_page">
        <WeekRowListSubPage />
        <RecordSubPage />
      </div>
    </div>
  )
}
