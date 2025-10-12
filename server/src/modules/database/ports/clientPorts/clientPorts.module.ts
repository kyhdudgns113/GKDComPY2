import {Module} from '@nestjs/common'
import {DBHubModule} from '@modules/database/dbHub'
import {ClientAuthPortModule, ClientAuthPortService} from './clientAuthPort'
import {ClientCommPortModule, ClientCommPortService} from './clientCommPort'

@Module({
  imports: [
    ClientAuthPortModule,
    ClientCommPortModule,
    DBHubModule // ::
  ],
  controllers: [],
  providers: [ClientAuthPortService, ClientCommPortService],
  exports: [ClientAuthPortService, ClientCommPortService]
})
export class ClientPortsModule {}
