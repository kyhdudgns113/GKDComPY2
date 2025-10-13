import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {ClientAuthPortModule, ClientAuthPortService} from './clientAuthPort'
import {ClientCommPortModule, ClientCommPortService} from './clientCommPort'
import {ClientClubPortModule, ClientClubPortService} from './clientClubPort'
import {ClientDocPortModule, ClientDocPortService} from './clientDocPort'

@Module({
  imports: [
    ClientAuthPortModule,
    ClientClubPortModule,
    ClientCommPortModule,
    ClientDocPortModule,
    DBHubModule // ::
  ],
  controllers: [],
  providers: [ClientAuthPortService, ClientCommPortService, ClientClubPortService, ClientDocPortService],
  exports: [ClientAuthPortService, ClientCommPortService, ClientClubPortService, ClientDocPortService]
})
export class ClientPortsModule {}
