import {Module} from '@nestjs/common'
import {ClientAuthController} from './client.auth.controller'
import {ClientAuthService} from './client.auth.service'
import {DatabaseModule} from '@modules/database/database.module'
import {GKDJwtModule} from '@modules/gkdJwt/gkdJwt.module'

@Module({
  imports: [DatabaseModule, GKDJwtModule],
  controllers: [ClientAuthController],
  providers: [ClientAuthService],
  exports: [ClientAuthService]
})
export class ClientAuthModule {}
