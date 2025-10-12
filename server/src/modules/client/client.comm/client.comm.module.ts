import {Module} from '@nestjs/common'
import {ClientCommController} from './client.comm.controller'
import {ClientCommService} from './client.comm.service'
import {DatabaseModule} from '@modules/database/database.module'
import {GKDJwtModule} from '@modules/gkdJwt/gkdJwt.module'

@Module({
  imports: [DatabaseModule, GKDJwtModule],
  controllers: [ClientCommController],
  providers: [ClientCommService],
  exports: [ClientCommService]
})
export class ClientCommModule {}
