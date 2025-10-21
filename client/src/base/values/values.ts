export const MODAL_NAME_ADD_CLUB = 'addClub'
export const MODAL_NAME_ADD_MEMBER = 'addMember'
export const MODAL_NAME_ADD_ROW_MEMBER = 'addRowMember'
export const MODAL_NAME_ADD_USER = 'addUser'
export const MODAL_NAME_DEL_MEMBER = 'delMember'
export const MODAL_NAME_MODIFY_CLUB = 'modifyClub'
export const MODAL_NAME_MODIFY_DAILY_INFO = 'modifyDailyInfo'
export const MODAL_NAME_MODIFY_ROW_MEMBER_INFO = 'modifyRowMemberInfo'
export const MODAL_NAME_MODIFY_USER = 'modifyUser'
export const MODAL_NAME_MODIFY_WEEKLY_INFO = 'modifyWeeklyInfo'
export const MODAL_NAME_RECORD = 'record'

export const MODAL_NAMES = [
  MODAL_NAME_ADD_CLUB,
  MODAL_NAME_ADD_MEMBER,
  MODAL_NAME_ADD_ROW_MEMBER,
  MODAL_NAME_ADD_USER,
  MODAL_NAME_DEL_MEMBER,
  MODAL_NAME_MODIFY_CLUB,
  MODAL_NAME_MODIFY_DAILY_INFO,
  MODAL_NAME_MODIFY_ROW_MEMBER_INFO,
  MODAL_NAME_MODIFY_USER,
  MODAL_NAME_MODIFY_WEEKLY_INFO,
  MODAL_NAME_RECORD
]

export const [COMM_MEMBER_SORT_MODE_CLUB, COMM_MEMBER_SORT_MODE_NAME] = [0, 1]

export const [RECORD_WIN, RECORD_DRAW, RECORD_LOSE, RECORD_MISS, RECORD_OK] = [0, 1, 2, 3, 4]

export const [
  SORT_TYPE_NAME_ASC,
  SORT_TYPE_NAME_DESC,
  SORT_TYPE_BATTER_ASC,
  SORT_TYPE_BATTER_DESC,
  SORT_TYPE_PITCHER_ASC,
  SORT_TYPE_PITCHER_DESC,
  SORT_TYPE_TOTAL_ASC,
  SORT_TYPE_TOTAL_DESC
] = [0, 1, 2, 3, 4, 5, 6, 7]

export const getResultString = (result: number) => {
  switch (result) {
    case RECORD_WIN:
      return ''
    case RECORD_DRAW:
      return '무'
    case RECORD_LOSE:
      return '패'
    case RECORD_MISS:
      return '미'
    case RECORD_OK:
      return '△'
    default:
      return '?'
  }
}
