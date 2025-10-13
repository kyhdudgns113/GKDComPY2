import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

import * as DTO from '@dto'
import * as HTTP from '@httpDataType'
import * as T from '@type'

@Injectable()
export class ClientDocPortService {
  constructor(private readonly dbHubService: DBHubService) {}

  // PUT AREA:

  /**
   * modifyClubDocument
   * - 클럽 문서 수정 함수
   *
   * 입력값
   * - clubOId: string
   *     + 수정할 클럽의 OId
   * - contents: string
   *     + 클럽 문서 내용
   *
   * 출력값
   * - clubDoc: T.DocumentType
   *     + 수정된 클럽 문서 정보
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 클럽 문서 수정 뙇!!
   * 3. 클럽 문서 읽기 뙇!!
   * 4. 리턴 뙇!!
   */
  async modifyClubDocument(jwtPayload: T.JwtPayloadType, data: HTTP.ModifyClubDocDataType) {
    const where = `/client/document/modifyClubDocument`
    const {clubOId, contents} = data
    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_ClubWrite(where, jwtPayload, clubOId)

      // 2. 클럽 문서 수정 뙇!!
      const dto: DTO.UpdateDocumentDTO = {clubOId, contents}
      await this.dbHubService.updateDocument(where, dto)

      // 3. 클럽 문서 읽기 뙇!!
      const {document: clubDoc} = await this.dbHubService.readDocumentByClubOId(where, clubOId)

      if (!clubDoc) {
        throw {
          gkd: {clubDocErr: '클럽에 문서가 없다는데요??'},
          gkdErrCode: 'DBHUB_UPDATE_DOCUMENT_NO_DOCUMENT',
          gkdErrMsg: '클럽에 문서가 없다는데요?',
          gkdStatus: {clubOId},
          statusCode: 500,
          where
        } as T.ErrorObjType
      }

      // 4. 리턴 뙇!!
      return {clubDoc}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  // GET AREA:

  /**
   * loadClubDocument
   * - 클럽 문서 내용 읽기 함수
   *
   * 입력값
   * - clubOId: string
   *     + 클럽 OId
   *
   * 출력값
   * - contents: string
   *     + 클럽 문서 내용
   *
   * 작동 순서
   * 1. 권한 췍!!
   * 2. 클럽 문서 내용 뙇!!
   * 3. 리턴 뙇!!
   */
  async loadClubDocument(jwtPayload: T.JwtPayloadType, clubOId: string) {
    const where = `/client/document/loadClubDocument/${clubOId}`
    try {
      // 1. 권한 췍!!
      await this.dbHubService.checkAuth_ClubRead(where, jwtPayload, clubOId)

      // 2. 클럽 문서 내용 뙇!!
      const {contents} = await this.dbHubService.readDocumentByClubOId(where, clubOId)

      // 3. 리턴 뙇!!
      return {contents}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
