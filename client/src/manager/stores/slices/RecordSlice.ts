import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit'

import * as ST from '@shareType'

// State 타입 정의
interface RecordState {
  dailyRecordMap: {[rowMemName: string]: {[dateVal: number]: ST.DailyRecordType}}
  dateInfoArr: ST.RecordDateInfo[]
  dayIdxSelected: number | null
  rowMemberArr: ST.RowMemberType[]
  weekOIdOpened: string
  weekRowArr: ST.WeekRowType[]
}

// 초기 상태
const initialState: RecordState = {
  dailyRecordMap: {},
  dateInfoArr: [],
  dayIdxSelected: null,
  rowMemberArr: [],
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
