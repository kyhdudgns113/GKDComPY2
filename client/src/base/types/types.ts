import type {Dispatch, SetStateAction} from 'react'
import type {DefaultEventsMap} from 'socket.io'
import type {Socket} from 'socket.io-client'

export type AuthBodyType = {
  jwtFromServer: string
  commAuth: number
  commOId: string
  userId: string
  userOId: string
}
export type CallbackType = () => void
export type LockType = {isLock: boolean; cnt: number}
export type Setter<T> = Dispatch<SetStateAction<T>>
export type SocketType = Socket<DefaultEventsMap, DefaultEventsMap> | null

export type ClubPriorityType = {
  [clubOId: string]: number
}
export type CommSettingType = {
  commName: string
  maxUsers: number
  maxClubs: number
}
export type MatchBlockInfoType = {
  /**
   * dayIdxArr
   * - 해당 블록이 저장된 날짜의 인덱스의 목록을 넣는다.
   * - 중복으로 기록될 수 있어서이다.
   */
  dayIdxArr: number[]
  result: '승' | '무' | '패' | '?' | 'x'
  tropy: number
  points: number
}
export type RecordStatisticType = {
  sumDraw: number
  sumLose: number
  sumMiss: number
  sumCond: number
}
export type ShowModeRecordType = 'record' | 'statistic'
