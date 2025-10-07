import {Body, Controller, Get, Headers, Param, Post} from '@nestjs/common'
import {AdminAuthService} from './admin.auth.service'

@Controller('/admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}
}
