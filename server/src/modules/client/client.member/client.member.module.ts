import {Module} from '@nestjs/common'
import {ClientMemberController} from './client.member.controller'
import {ClientMemberService} from './client.member.service'
import {DatabaseModule} from '@modules/database/database.module'
import {GKDJwtModule} from '@modules/gkdJwt/gkdJwt.module'
import {CheckJwtValidationGuard} from '@commons/guards'

@Module({
  imports: [DatabaseModule, GKDJwtModule],
  controllers: [ClientMemberController],
  providers: [ClientMemberService],
  exports: [ClientMemberService]
})
export class ClientMemberModule {}
