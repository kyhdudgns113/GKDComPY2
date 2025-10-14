import {Injectable} from '@nestjs/common'
import {JwtService, JwtSignOptions} from '@nestjs/jwt'
import {
  decodeJwtFromClient,
  encodeJwtFromServer,
  generateRandomString,
  getJwtFromHeader,
  gkdJwtSignOption,
  jwtHeaderLenBase,
  jwtHeaderLenVali
} from 'src/common/secret'
import {JwtPayloadType} from 'src/common/types'

@Injectable()
export class GKDJwtService {
  private uOIdToHeaderToUrl: {[uOId: string]: {[header: string]: string}} = {}
  constructor(private jwtService: JwtService) {}

  checkUOIdToHeaderToUrl(uOId: string, header: string) {
    return (this.uOIdToHeaderToUrl[uOId] && this.uOIdToHeaderToUrl[uOId][header]) || null
  }

  /**
   * JWT 인증을 처음 요청할때 호출된다.
   * 클라이언트가 복호 및 암호화해야 할 숙제를 전달한다
   * body.jwtFromServer 로 전달한다.
   *
   * @param headers : http 요청 헤더
   * @returns : http 기본 응답 Object
   */
  async requestValidation(headers: any) {
    try {
      const url = headers.url
      const {jwtFromClient} = getJwtFromHeader(headers)
      const {jwt} = decodeJwtFromClient(jwtFromClient, jwtHeaderLenBase)
      const extractedPayload = (await this.jwtService.verifyAsync(jwt)) as JwtPayloadType
      const jwtPayload: JwtPayloadType = {
        userId: extractedPayload.userId,
        userOId: extractedPayload.userOId
      }

      const userOId = jwtPayload.userOId
      const newHeader = generateRandomString(jwtHeaderLenVali)
      const newJwt = await this.jwtService.signAsync(jwtPayload)

      if (!this.uOIdToHeaderToUrl[userOId]) {
        this.uOIdToHeaderToUrl[userOId] = {}
      }
      this.uOIdToHeaderToUrl[userOId][newHeader] = url

      setTimeout(() => {
        delete this.uOIdToHeaderToUrl[userOId][newHeader]
      }, 3000)

      const {jwtFromServer} = encodeJwtFromServer(newHeader, newJwt)

      return {ok: true, body: {jwtFromServer}, errObj: {}}
      // BLANK LINE COMMENT:
    } catch (errObj) {
      // BLANK LINE COMMENT:
      return {ok: false, body: {}, errObj}
    }
  }
  /**
   * Socket 에서 사용하는 JWT 인증
   */
  async requestValidationSocket(jwtFromClient: string) {
    try {
      const {jwt} = decodeJwtFromClient(jwtFromClient, jwtHeaderLenBase)
      const extractedPayload = (await this.jwtService.verifyAsync(jwt)) as JwtPayloadType

      const {userId, userOId} = extractedPayload

      const jwtPayload: JwtPayloadType = {
        userId,
        userOId
      }
      const newHeader = generateRandomString(jwtHeaderLenVali)
      const newJwt = await this.jwtService.signAsync(jwtPayload)

      const {jwtFromServer} = encodeJwtFromServer(newHeader, newJwt)

      return {ok: true, body: {jwtFromServer}, errObj: {}}
      // ::
    } catch (errObj) {
      // ::
      return {ok: false, body: {jwtFromServer: ''}, errObj}
    }
  }
  resetUOIdToHeaderToUrl(userOId: string, header: string) {
    delete this.uOIdToHeaderToUrl[userOId][header]
  }
  /**
   * 로그인에서 쓰지마 제발
   */

  async signAsync(payload: JwtPayloadType, options: JwtSignOptions = gkdJwtSignOption) {
    try {
      const jwt = await this.jwtService.signAsync(payload, options)
      const header = generateRandomString(jwtHeaderLenBase)
      const {jwtFromServer} = encodeJwtFromServer(header, jwt)
      return {jwtFromServer}
      // BLANK LINE COMMENT:
    } catch (errObj) {
      // BLANK LINE COMMENT:
      throw errObj
    }
  }

  /**
   * Validation 위한 토큰 생성에만 쓴다.
   */
  async signAsyncValidation(payload: JwtPayloadType, options: JwtSignOptions = gkdJwtSignOption) {
    try {
      const jwt = await this.jwtService.signAsync(payload, options)
      const header = generateRandomString(jwtHeaderLenVali)
      const {jwtFromServer} = encodeJwtFromServer(header, jwt)
      return {jwtFromServer}
      // BLANK LINE COMMENT:
    } catch (errObj) {
      // BLANK LINE COMMENT:
      throw errObj
    }
  }
  async verifyAsync(jwtFromClient: string, headerLen: number) {
    try {
      const {jwt} = decodeJwtFromClient(jwtFromClient, headerLen)
      return (await this.jwtService.verifyAsync(jwt)) as JwtPayloadType
      // BLANK LINE COMMENT:
    } catch (errObj) {
      // BLANK LINE COMMENT:
      throw errObj
    }
  }
}
