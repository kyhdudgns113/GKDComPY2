import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as DTO from '@dto'
import * as ST from '@shareType'

@Injectable()
export class DocDBService {
  constructor(private readonly dbService: DBService) {}

  async readDocumentByClubOId(where: string, clubOId: string) {
    const connection = await this.dbService.getConnection()
    try {
      const queryRead = 'SELECT * FROM docs WHERE clubOId = ?'
      const paramRead = [clubOId]
      const [resultRows] = await connection.execute(queryRead, paramRead)

      const resultArray = resultRows as RowDataPacket[]
      if (resultArray.length === 0) {
        return {document: null, contents: ''}
      }

      const document: ST.DocumentType = {
        documentOId: resultArray[0].documentOId,
        clubOId: resultArray[0].clubOId,
        contents: resultArray[0].contents
      }
      return {document, contents: document.contents}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }

  async updateDocument(where: string, dto: DTO.UpdateDocumentDTO) {
    const {clubOId, contents} = dto

    const connection = await this.dbService.getConnection()
    try {
      const queryUpdate = 'UPDATE docs SET contents = ? WHERE clubOId = ?'
      const paramUpdate = [contents, clubOId]
      await connection.execute(queryUpdate, paramUpdate)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
      // ::
    } finally {
      // ::
      connection.release()
    }
  }
}
