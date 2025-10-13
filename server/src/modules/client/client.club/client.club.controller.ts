import {Body, Controller, Get, Headers, Param, Post} from '@nestjs/common'
import {ClientClubService} from './client.club.service'

@Controller('/client/club')
export class ClientClubController {
  constructor(private readonly clientClubService: ClientClubService) {}
}
