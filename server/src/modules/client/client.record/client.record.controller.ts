import {Body, Controller, Delete, Get, Headers, Param, Post, UseGuards} from '@nestjs/common'
import {CheckJwtValidationGuard} from '@guard'

import {ClientRecordService} from './client.record.service'

import * as HTTP from '@httpDataType'

@Controller('/client/record')
export class ClientRecordController {
  constructor(private readonly clientRecordService: ClientRecordService) {}

  // POST AREA:

  @Post('/addNextWeek')
  @UseGuards(CheckJwtValidationGuard)
  async addNextWeek(@Headers() headers: any, @Body() data: HTTP.AddNextWeekDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientRecordService.addNextWeek(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  @Post('/addPrevWeek')
  @UseGuards(CheckJwtValidationGuard)
  async addPrevWeek(@Headers() headers: any, @Body() data: HTTP.AddPrevWeekDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientRecordService.addPrevWeek(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  // GET AREA:

  @Get('/loadClubWeekRowArr/:clubOId')
  @UseGuards(CheckJwtValidationGuard)
  async loadClubWeekRowArr(@Headers() headers: any, @Param('clubOId') clubOId: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientRecordService.loadClubWeekRowArr(jwtPayload, clubOId)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  @Get('/loadWeeklyRecordInfo/:weekOId')
  @UseGuards(CheckJwtValidationGuard)
  async loadWeeklyRecordInfo(@Headers() headers: any, @Param('weekOId') weekOId: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientRecordService.loadWeeklyRecordInfo(jwtPayload, weekOId)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  // DELETE AREA:

  @Delete('/removeWeekRow/:weekOId')
  @UseGuards(CheckJwtValidationGuard)
  async removeWeekRow(@Headers() headers: any, @Param('weekOId') weekOId: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientRecordService.removeWeekRow(jwtPayload, weekOId)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
