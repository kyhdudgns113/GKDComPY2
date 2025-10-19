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
  rowMemberArr: ST.RowMemberType[]
  rowMemberOpened: ST.RowMemberType | null
  statisticArr: T.RecordStatisticType[]
  weekOIdOpened: string
  weekRowArr: ST.WeekRowType[]
}

// 초기 상태
const initialState: RecordState = {
  dailyRecordMap: {},
  dateInfoArr: [],
  dayIdxSelected: null,
  rowMemberArr: [],
  rowMemberOpened: null,
  statisticArr: Array.from({length: 6}, () => ({sumDraw: 0, sumLose: 0, sumMiss: 0, sumCond: 0})),
  weekOIdOpened: '',
  weekRowArr: []
}

// Slice 생성 (액션 + 리듀서를 한번에)
export const recordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    // dailyRecordMap 초기화
    resetDailyRecordMap: state => {
      state.dailyRecordMap = {}
    },
    // dailyRecordMap 설정
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
    // ::
    incStaticDraw: (state, action: PayloadAction<number>) => {
      state.statisticArr[action.payload].sumDraw += 1
    },
    incStaticLose: (state, action: PayloadAction<number>) => {
      state.statisticArr[action.payload].sumLose += 1
    },
    incStaticMiss: (state, action: PayloadAction<number>) => {
      state.statisticArr[action.payload].sumMiss += 1
    },
    incStaticCond: (state, action: PayloadAction<number>) => {
      state.statisticArr[action.payload].sumCond += 1
    },
    // statisticArr 초기화
    resetStatisticArr: state => {
      state.statisticArr = Array.from({length: 6}, () => ({sumDraw: 0, sumLose: 0, sumMiss: 0, sumCond: 0}))
    },
    // ::
    // dateInfoArr 초기화
    resetDateInfoArr: state => {
      state.dateInfoArr = []
    },
    // dateInfoArr 설정
    setDateInfoArrFromArr: (state, action: PayloadAction<ST.RecordDateInfo[]>) => {
      state.dateInfoArr = action.payload.sort((a, b) => a.dateVal - b.dateVal)
    },
    // ::
    // dayIdxSelected 설정
    setDayIdxSelected: (state, action: PayloadAction<number>) => {
      state.dayIdxSelected = action.payload
    },
    // dayIdxSelected 해제
    resetDayIdxSelected: state => {
      state.dayIdxSelected = null
    },
    // ::
    // rowMemberArr 초기화
    resetRowMemberArr: state => {
      state.rowMemberArr = []
    },
    // rowMemberArr 설정
    setRowMemberArr: (state, action: PayloadAction<ST.RowMemberType[]>) => {
      state.rowMemberArr = action.payload
    },
    // ::
    // rowMemberOpened 설정
    setRowMemberOpened: (state, action: PayloadAction<ST.RowMemberType>) => {
      state.rowMemberOpened = action.payload
    },
    // rowMemberOpened 해제
    resetRowMemberOpened: state => {
      state.rowMemberOpened = null
    },
    // ::
    // 주차 OId 해제
    resetWeekOIdOpened: state => {
      state.weekOIdOpened = ''
    },
    // 주차 OId 설정
    setWeekOIdOpened: (state, action: PayloadAction<string>) => {
      state.weekOIdOpened = action.payload
    },
    // ::
    // 주차 배열 설정
    setWeekRowArr: (state, action: PayloadAction<ST.WeekRowType[]>) => {
      state.weekRowArr = action.payload
    }
  }
})

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
