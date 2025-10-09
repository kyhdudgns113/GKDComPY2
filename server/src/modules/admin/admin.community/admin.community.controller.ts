import {Body, Controller, Get, Headers, Param, Post, UseGuards} from '@nestjs/common'
import {AdminCommunityService} from './admin.community.service'

import {CheckAdminGuard} from '@commons/guards'

@Controller('/admin/community')
export class AdminCommunityController {
  constructor(private readonly adminCommunityService: AdminCommunityService) {}

  // GET AREA:

  @Get('/loadCommArr')
  @UseGuards(CheckAdminGuard)
  async loadCommArr(@Headers() headers: any) {
    const {jwtFromHeader, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.adminCommunityService.loadCommArr(jwtPayload)
    return {ok, body, gkdErrMsg, statusCode, jwtFromHeader}
  }
}
