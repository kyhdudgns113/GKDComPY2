import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {ClientAuthPortModule, ClientAuthPortService} from './clientAuthPort'
import {ClientChatPortModule, ClientChatPortService} from './clientChatPort'
import {ClientCommPortModule, ClientCommPortService} from './clientCommPort'
import {ClientClubPortModule, ClientClubPortService} from './clientClubPort'
import {ClientDocPortModule, ClientDocPortService} from './clientDocPort'
import {ClientMemberPortModule, ClientMemberPortService} from './clientMemberPort'
import {ClientRecordPortModule, ClientRecordPortService} from './clientRecordPort'

@Module({
  imports: [
    ClientAuthPortModule,
    ClientChatPortModule,
    ClientClubPortModule,
    ClientCommPortModule,
    ClientDocPortModule,
    ClientMemberPortModule,
    ClientRecordPortModule,
    DBHubModule // ::
  ],
  controllers: [],
  providers: [
    ClientAuthPortService, // ::
    ClientChatPortService,
    ClientCommPortService,
    ClientClubPortService,
    ClientDocPortService,
    ClientMemberPortService,
    ClientRecordPortService
  ],

  exports: [
    ClientAuthPortService, // ::
    ClientChatPortService,
    ClientCommPortService,
    ClientClubPortService,
    ClientDocPortService,
    ClientMemberPortService,
    ClientRecordPortService
  ]
})
export class ClientPortsModule {}
