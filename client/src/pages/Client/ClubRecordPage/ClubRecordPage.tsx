import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

type ClubRecordPageProps = DivCommonProps & {}

export const ClubRecordPage: FC<ClubRecordPageProps> = ({className, style, ...props}) => {
  return (
    <div className={`ClubRecord_Page CliengPages ${className || ''}`} style={style} {...props}>
      <p>클럽 기록 페이지</p>
    </div>
  )
}
