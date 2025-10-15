import {Module} from '@nestjs/common'
import {ClientClubController} from './client.club.controller'
import {ClientClubService} from './client.club.service'
import {DatabaseModule} from '@modules/database/database.module'
import {GKDJwtModule} from '@modules/gkdJwt/gkdJwt.module'

@Module({
  imports: [DatabaseModule, GKDJwtModule],
  controllers: [ClientClubController],
  providers: [ClientClubService],
  exports: [ClientClubService]
})
export class ClientClubModule {}
