import {createSelector, createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'
import type {AdminStates} from '../store'

import * as ST from '@shareType'
import * as T from '@type'

// State 타입 정의
interface RecordState {
  dailyRecordMap: {[rowMemName: string]: {[dateVal: number]: ST.DailyRecordType}}
  dateInfoArr: ST.RecordDateInfo[]
  dayIdxSelected: number | null
  matchBlockMatrix: T.MatchBlockInfoType[][]
  rowMemberArr: ST.RowMemberType[]
  rowMemberOpened: ST.RowMemberType | null
  showModeRecord: T.ShowModeRecordType
  statisticArr: T.RecordStatisticType[]
  weekOIdOpened: string
  weekRowArr: ST.WeekRowType[]
}

// 초기 상태
const initialState: RecordState = {
  dailyRecordMap: {},
  dateInfoArr: [],
  dayIdxSelected: null,
  matchBlockMatrix: Array.from({length: 6}, () =>
    Array.from({length: 6}, () => {
      return {
        dayIdxArr: [],
        result: '?',
        tropy: 0,
        points: 0
      } as T.MatchBlockInfoType
    })
  ),
  rowMemberArr: [],
  rowMemberOpened: null,
  showModeRecord: 'record',
  statisticArr: Array.from({length: 6}, () => ({sumDraw: 0, sumLose: 0, sumMiss: 0, sumCond: 0})),
  weekOIdOpened: '',
  weekRowArr: []
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    incStaticCond: (state, action: PayloadAction<number>) => {
      state.statisticArr[action.payload].sumCond += 1
    },
    incStaticDraw: (state, action: PayloadAction<number>) => {
      state.statisticArr[action.payload].sumDraw += 1
    },
    incStaticLose: (state, action: PayloadAction<number>) => {
      state.statisticArr[action.payload].sumLose += 1
    },
    incStaticMiss: (state, action: PayloadAction<number>) => {
      state.statisticArr[action.payload].sumMiss += 1
    },

    openShowModeRecord: state => {
      state.showModeRecord = 'record'
    },
    openShowModeStatistic: state => {
      state.showModeRecord = 'statistic'
    },

    resetDailyRecordMap: state => {
      state.dailyRecordMap = {}
    },
    resetDateInfoArr: state => {
      state.dateInfoArr = []
    },
    resetDayIdxSelected: state => {
      state.dayIdxSelected = null
    },
    resetRowMemberArr: state => {
      state.rowMemberArr = []
    },
    resetRowMemberOpened: state => {
      state.rowMemberOpened = null
    },
    resetMatchBlockMatrix: state => {
      state.matchBlockMatrix = Array.from({length: 6}, () =>
        Array.from(
          {length: 6},
          () =>
            ({
              dayIdxArr: [],
              result: '?',
              tropy: 0,
              points: 0
            } as T.MatchBlockInfoType)
        )
      )
    },
    resetStatisticArr: state => {
      state.statisticArr = Array.from({length: 6}, () => ({sumDraw: 0, sumLose: 0, sumMiss: 0, sumCond: 0}))
    },
    resetWeekOIdOpened: state => {
      state.weekOIdOpened = ''
    },

    setDailyRecordMapFromArr: (state, action: PayloadAction<ST.DailyRecordType[]>) => {
      const newMap: {[rowMemName: string]: {[dateVal: number]: ST.DailyRecordType}} = {}
      action.payload.forEach(record => {
        if (!newMap[record.rowMemName]) {
          newMap[record.rowMemName] = {}
        }
        newMap[record.rowMemName][record.dateVal] = record
      })
      state.dailyRecordMap = newMap
      state.statisticArr = Array.from({length: 6}, () => ({sumDraw: 0, sumLose: 0, sumMiss: 0, sumCond: 0}))
    },
    setDateInfoArrFromArr: (state, action: PayloadAction<ST.RecordDateInfo[]>) => {
      state.dateInfoArr = action.payload.sort((a, b) => a.dateVal - b.dateVal)
    },
    setDayIdxSelected: (state, action: PayloadAction<number>) => {
      state.dayIdxSelected = action.payload
    },
    setMatchBlockMatrixFromDateInfoArr: (state, action: PayloadAction<ST.RecordDateInfo[]>) => {
      const dateInfoArr = action.payload
      const newBlockMatrix = Array.from({length: 6}, () =>
        Array.from(
          {length: 6},
          () =>
            ({
              dayIdxArr: [],
              result: '?',
              tropy: 0,
              points: 0
            } as T.MatchBlockInfoType)
        )
      )

      dateInfoArr.forEach((dateInfo, dayIdx) => {
        const {teamResultArr} = dateInfo

        teamResultArr.forEach(teamResult => {
          const [dayIdxA, tropyA, pointsA, winResult, pointsB, tropyB, dayIdxB] = teamResult

          if (dayIdxA === dayIdxB) return

          const [rowIdxA, rowIdxB] = [dayIdxA + 1, dayIdxB + 1]

          newBlockMatrix[rowIdxA][rowIdxB].dayIdxArr.push(dayIdx)
          newBlockMatrix[rowIdxB][rowIdxA].dayIdxArr.push(dayIdx)

          newBlockMatrix[rowIdxA][rowIdxB].result = winResult === -1 ? '승' : winResult === 0 ? '무' : '패'
          newBlockMatrix[rowIdxB][rowIdxA].result = winResult === -1 ? '패' : winResult === 0 ? '무' : '승'

          newBlockMatrix[rowIdxA][rowIdxB].tropy = tropyA
          newBlockMatrix[rowIdxB][rowIdxA].tropy = tropyB

          newBlockMatrix[rowIdxA][rowIdxB].points = pointsA
          newBlockMatrix[rowIdxB][rowIdxA].points = pointsB
        })
      })

      state.matchBlockMatrix = newBlockMatrix
    },
    setRowMemberArr: (state, action: PayloadAction<ST.RowMemberType[]>) => {
      state.rowMemberArr = action.payload
    },
    setRowMemberOpened: (state, action: PayloadAction<ST.RowMemberType>) => {
      state.rowMemberOpened = action.payload
    },
    setWeekOIdOpened: (state, action: PayloadAction<string>) => {
      state.weekOIdOpened = action.payload
    },
    setWeekRowArr: (state, action: PayloadAction<ST.WeekRowType[]>) => {
      state.weekRowArr = action.payload
    }
  }
})

const DATE_ARR = ['월', '화', '수', '목', '금', '토'] as const

// 유틸: 클럽명 반환 (인덱스 -1=우리클럽, 0~5=상대클럽)
export const getEnemyClubName = (clubOpened: {clubName: string}, index: number, dateInfoArr: ST.RecordDateInfo[]): string => {
  if (index === -1) return clubOpened.clubName
  return dateInfoArr?.[index]?.enemyName || `${DATE_ARR[index]} 상대`
}

// Selector: statisticArr 선택
const selectStatisticArr = (state: AdminStates) => state.Record.statisticArr

// Memoized Selector: 주간 통계 합계
export const getWeeklyStatisticArr = createSelector([selectStatisticArr], statisticArr => {
  let sumDraw = 0
  let sumLose = 0
  let sumMiss = 0
  let sumCond = 0
  for (let i = 0; i < 6; i++) {
    sumDraw += statisticArr[i].sumDraw
    sumLose += statisticArr[i].sumLose
    sumMiss += statisticArr[i].sumMiss
    sumCond += statisticArr[i].sumCond
  }
  return {sumDraw, sumLose, sumMiss, sumCond}
})
