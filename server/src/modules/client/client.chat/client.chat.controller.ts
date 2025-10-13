import {Body, Controller, Get, Headers, Param, Post, UseGuards} from '@nestjs/common'
import {CheckJwtValidationGuard} from '@guard'
import {ClientChatService} from './client.chat.service'

@Controller('/client/chat')
export class ClientChatController {
  constructor(private readonly clientChatService: ClientChatService) {}

  // GET AREA:

  @Get('/loadClubChatArr/:clubOId/:lastChatIdx')
  @UseGuards(CheckJwtValidationGuard)
  async loadClubChatArr(@Headers() headers: any, @Param('clubOId') clubOId: string, @Param('lastChatIdx') lastChatIdx: string) {
    const {jwtFromServer, jwtPayload} = headers
    const {ok, body, gkdErrMsg, statusCode} = await this.clientChatService.loadClubChatArr(jwtPayload, clubOId, lastChatIdx)
    return {ok, body, gkdErrMsg, statusCode, jwtFromServer}
  }
}
