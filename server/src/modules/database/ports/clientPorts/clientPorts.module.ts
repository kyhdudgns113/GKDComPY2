import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {ClientAuthPortModule, ClientAuthPortService} from './clientAuthPort'
import {ClientChatPortModule, ClientChatPortService} from './clientChatPort'
import {ClientCommPortModule, ClientCommPortService} from './clientCommPort'
import {ClientClubPortModule, ClientClubPortService} from './clientClubPort'
import {ClientDocPortModule, ClientDocPortService} from './clientDocPort'

@Module({
  imports: [
    ClientAuthPortModule,
    ClientChatPortModule,
    ClientClubPortModule,
    ClientCommPortModule,
    ClientDocPortModule,
    DBHubModule // ::
  ],
  controllers: [],
  providers: [
    ClientAuthPortService, // ::
    ClientChatPortService,
    ClientCommPortService,
    ClientClubPortService,
    ClientDocPortService
  ],

  exports: [
    ClientAuthPortService, // ::
    ClientChatPortService,
    ClientCommPortService,
    ClientClubPortService,
    ClientDocPortService
  ]
})
export class ClientPortsModule {}
