import {Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards} from '@nestjs/common'
import {AdminCommunityService} from './admin.community.service'

import {CheckAdminGuard} from '@commons/guards'

import * as HTTP from '@httpDataType'

@Controller('/admin/community')
export class AdminCommunityController {
  constructor(private readonly adminCommunityService: AdminCommunityService) {}

  // POST AREA:

  @Post('/addCommunity')
  @UseGuards(CheckAdminGuard)
  async addCommunity(@Headers() headers: any, @Body() data: HTTP.AddCommunityDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.addCommunity(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  @Post('/addCommClub')
  @UseGuards(CheckAdminGuard)
  async addCommClub(@Headers() headers: any, @Body() data: HTTP.AddCommClubDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.addCommClub(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  @Post('/addCommUser')
  @UseGuards(CheckAdminGuard)
  async addCommUser(@Headers() headers: any, @Body() data: HTTP.AddCommUserDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.addCommUser(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  // PUT AREA:
  @Put('/modifyCommUser')
  @UseGuards(CheckAdminGuard)
  async modifyCommUser(@Headers() headers: any, @Body() data: HTTP.ModifyCommUserDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.modifyCommUser(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  // GET AREA:

  @Get('/loadCommArr')
  @UseGuards(CheckAdminGuard)
  async loadCommArr(@Headers() headers: any) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.loadCommArr(jwtPayload)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  @Get('/loadCommClubArr/:commOId')
  @UseGuards(CheckAdminGuard)
  async loadCommClubArr(@Headers() headers: any, @Param('commOId') commOId: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.loadCommClubArr(jwtPayload, commOId)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  @Get('/loadCommUserArr/:commOId')
  @UseGuards(CheckAdminGuard)
  async loadCommUserArr(@Headers() headers: any, @Param('commOId') commOId: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.loadCommUserArr(jwtPayload, commOId)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  // DELETE AREA:

  @Delete('/deleteCommUser/:userOId')
  @UseGuards(CheckAdminGuard)
  async deleteCommUser(@Headers() headers: any, @Param('userOId') userOId: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.deleteCommUser(jwtPayload, userOId)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
