import {Controller, Get, Headers, Param, UseGuards} from '@nestjs/common'
import {CheckJwtValidationGuard} from '@guard'

import {ClientRecordService} from './client.record.service'

@Controller('/client/record')
export class ClientRecordController {
  constructor(private readonly clientRecordService: ClientRecordService) {}

  // GET AREA:

  @Get('/loadClubWeekRowArr/:clubOId')
  @UseGuards(CheckJwtValidationGuard)
  async loadClubWeekRowArr(@Headers() headers: any, @Param('clubOId') clubOId: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientRecordService.loadClubWeekRowArr(jwtPayload, clubOId)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
