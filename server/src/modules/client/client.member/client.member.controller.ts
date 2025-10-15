import {Body, Controller, Get, Headers, Param, Post, UseGuards} from '@nestjs/common'
import {CheckJwtValidationGuard} from '@guard'

import {ClientMemberService} from './client.member.service'

import * as HTTP from '@httpDataType'

@Controller('/client/member')
export class ClientMemberController {
  constructor(private readonly clientMemberService: ClientMemberService) {}

  // POST AREA:

  @Post('/addClubMember')
  @UseGuards(CheckJwtValidationGuard)
  async addClubMember(@Headers() headers: any, @Body() data: HTTP.AddClubMemberDataType) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientMemberService.addClubMember(jwtPayload, data)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }

  // GET AREA:

  @Get('/loadClubMemberArr/:clubOId')
  @UseGuards(CheckJwtValidationGuard)
  async loadClubMemberArr(@Headers() headers: any, @Param('clubOId') clubOId: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientMemberService.loadClubMemberArr(jwtPayload, clubOId)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
