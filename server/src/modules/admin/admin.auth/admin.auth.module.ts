import {Module} from '@nestjs/common'
import {AdminAuthController} from './admin.auth.controller'
import {AdminAuthService} from './admin.auth.service'
import {DatabaseModule} from '@modules/database/database.module'
import {GKDJwtModule} from '@modules/gkdJwt/gkdJwt.module'

@Module({
  imports: [DatabaseModule, GKDJwtModule],
  controllers: [AdminAuthController],
  providers: [AdminAuthService],
  exports: [AdminAuthService]
})
export class AdminAuthModule {}
