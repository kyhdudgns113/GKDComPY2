import {Module} from '@nestjs/common'
import {AdminAuthController} from './admin.auth.controller'
import {AdminAuthService} from './admin.auth.service'

@Module({
  imports: [],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
  exports: [AdminAuthService]
})
export class AdminAuthModule {}
