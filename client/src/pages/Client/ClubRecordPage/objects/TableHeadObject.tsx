import type {FC} from 'react'
import type {TableHeadCommonProps} from '@prop'
import type {WeekRowType} from '@shareType'

import '../_styles/Obj_TableHead.scss'

type TableHeadObjectProps = TableHeadCommonProps & {
  weekRow: WeekRowType
}

export const TableHeadObject: FC<TableHeadObjectProps> = ({weekRow, className, style, ...props}) => {
  const {weekOId} = weekRow

  return (
    <thead className={`TableHead_Object ${weekOId} ${className || ''}`} style={style} {...props}>
      {/* 0행 */}
      <tr className="_tr_0">
        {/* 0~3행 0~4열: 주간 통계 */}
        <th className="th_week_statistic th_bd_r_4" colSpan={5} rowSpan={4}>
          주간 통계
        </th>
        {/* 0행 5~8열: 요일*/}
        <th className="th_row_category" colSpan={4} rowSpan={1}>
          요일
        </th>
        {/* 0행 9~13열: 월*/}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          월
        </th>
        {/* 0행 14~18열: 화*/}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          화
        </th>
        {/* 0행 19~23열: 수*/}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          수
        </th>
        {/* 0행 24~28열: 목*/}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          목
        </th>
        {/* 0행 29~33열: 금*/}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          금
        </th>
        {/* 0행 34~38열: 토*/}
        <th colSpan={5} rowSpan={1}>
          토
        </th>
      </tr>
      {/* 1행: 5열부터 */}
      <tr className="_tr_1">
        {/* 1행 5~8열: 상대 클럽 */}
        <th className="th_row_category" colSpan={4} rowSpan={1}>
          상대 클럽
        </th>
        {/* 1행 9~13열: 클럽명: 월요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          클럽명: 월요일
        </th>
        {/* 1행 14~18열: 클럽명: 화요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          클럽명: 화요일
        </th>
        {/* 1행 19~23열: 클럽명: 수요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          클럽명: 수요일
        </th>
        {/* 1행 24~28열: 클럽명: 목요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          클럽명: 목요일
        </th>
        {/* 1행 29~33열: 클럽명: 금요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          클럽명: 금요일
        </th>
        {/* 1행 34~38열: 클럽명: 토요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          클럽명: 토요일
        </th>
      </tr>
      {/* 2행: 5열부터 */}
      <tr className="_tr_2">
        {/* 2행 5~8열: 선발 순서 */}
        <th className="th_row_category" colSpan={4} rowSpan={1}>
          선발 순서
        </th>
        {/* 2행 9~13열: 선발순서: 월요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          123
        </th>
        {/* 2행 14~18열: 선발순서: 화요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          234
        </th>
        {/* 2행 19~23열: 선발순서: 수요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          345
        </th>
        {/* 2행 24~28열: 선발순서: 목요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          451
        </th>
        {/* 2행 29~33열: 선발순서: 금요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          512
        </th>
        {/* 2행 34~38열: 선발순서: 토요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          123
        </th>
      </tr>
      {/* 3행: 5열부터 */}
      <tr className="_tr_3">
        {/* 3행 5~8열: 클 전 오더 */}
        <th className="th_row_category" colSpan={4} rowSpan={1}>
          클전 오더
        </th>
        {/* 3행 9~13열: 오더: 월요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          오더: 월요일
        </th>
        {/* 3행 14~18열: 오더: 화요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          오더: 화요일
        </th>
        {/* 3행 19~23열: 오더: 수요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          오더: 수요일
        </th>
        {/* 3행 24~28열: 오더: 목요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          오더: 목요일
        </th>
        {/* 3행 29~33열: 오더: 금요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          오더: 금요일
        </th>
        {/* 3행 34~38열: 오더: 토요일 */}
        <th className="th_bd_r_4" colSpan={5} rowSpan={1}>
          오더: 토요일
        </th>
      </tr>
      {/* 4행: 0열부터 */}
      <tr className="_tr_4">
        {/* 4행 0~4열: 주간 통계 */}
        <th className="_th_week th_bd_r_2">컨</th>
        <th className="_th_week th_bd_r_2">무</th>
        <th className="_th_week th_bd_r_2">패</th>
        <th className="_th_week th_bd_r_2">미</th>
        <th className="_th_week th_bd_r_4">V</th>
        {/* 4행 5~8열 멤버 정보 카테고리 */}
        <th className="_th_member_star th_bd_r_2">별</th>
        <th className="_th_member_name th_bd_r_2">닉네임</th>
        <th className="_th_member_pitcher th_bd_r_2">투수</th>
        <th className="_th_member_total th_bd_r_6">총합</th>
        {/* 4행 9~38열: 요일별 기록 카테고리 */}
        {Array.from({length: 6}).map((_, idx) => (
          <>
            <th className="_th_day_cond th_bd_r_2" key={6 * idx}>
              컨
            </th>
            <th className="_th_day_result th_bd_r_2" key={6 * idx + 1}>
              1
            </th>
            <th className="_th_day_result th_bd_r_2" key={6 * idx + 2}>
              2
            </th>
            <th className="_th_day_result th_bd_r_2" key={6 * idx + 3}>
              3
            </th>
            <th className="_th_day_comment th_bd_r_4" key={6 * idx + 4}>
              V
            </th>
          </>
        ))}
      </tr>
    </thead>
  )
}
