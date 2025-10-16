import {DEBUG_MODE} from '@secret'

export * from './_decorators'
export * from './dateFunctions'

export const consoleColors = {
  Reset: '\x1b[0m',
  Bright: '\x1b[1m',
  Dim: '\x1b[2m',
  Underscore: '\x1b[4m',
  Blink: '\x1b[5m',
  Reverse: '\x1b[7m',
  Hidden: '\x1b[8m',

  FgBlack: '\x1b[30m',
  FgRed: '\x1b[31m',
  FgGreen: '\x1b[32m',
  FgYellow: '\x1b[33m',
  FgBlue: '\x1b[34m',
  FgMagenta: '\x1b[35m',
  FgCyan: '\x1b[36m',
  FgWhite: '\x1b[37m',

  BgBlack: '\x1b[40m',
  BgRed: '\x1b[41m',
  BgGreen: '\x1b[42m',
  BgYellow: '\x1b[43m',
  BgBlue: '\x1b[44m',
  BgMagenta: '\x1b[45m',
  BgCyan: '\x1b[46m',
  BgWhite: '\x1b[47m'
}

export const generateObjectId = (): string => {
  // MongoDB ObjectId 비슷하게 24자리 hex string 생성
  return Array.from({length: 24}, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

export const getFailResponse = (errObj: any) => {
  const gkdErrMsg = errObj.gkdErrMsg || `서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.`
  const statusCode = errObj.statusCode || 500

  /**
   * jwtFromServer 를 빈 문자열로 처리해도 된다.
   * - 빈 문자열이면 안되는 경우는 controller 에서 이 값을 안 쓴다.
   */
  const jwtFromServer = ''

  if (DEBUG_MODE) {
    console.log(`\ngkdErrMsg: ${gkdErrMsg}`)
    console.log(`errObj: ${errObj}`)

    Object.keys(errObj).forEach(key => {
      console.log(`   ${key}: ${errObj[key]}`)
    })
  }
  return {ok: false, body: {}, gkdErrMsg, statusCode, jwtFromServer}
}

export const printErrObj = (errObj: any) => {
  console.log(`\nerrObj: ${errObj}`)

  Object.keys(errObj).forEach(key => {
    console.log(`   ${key}: ${errObj[key]}`)
  })
}

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
