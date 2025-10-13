import {Module} from '@nestjs/common'
import {DBHubModule} from './dbHub'

import * as P from './ports'

@Module({
  imports: [
    DBHubModule,
    // ::
    P.AdminPortsModule,
    P.ClientPortsModule,
    P.JwtPortModule
  ],
  controllers: [],
  providers: [
    P.AdminAuthPortService, // ::
    P.AdminCommPortService,
    P.ClientAuthPortService,
    P.ClientChatPortService,
    P.ClientClubPortService,
    P.ClientCommPortService,
    P.ClientDocPortService,
    P.JwtPortService
  ],
  exports: [
    P.AdminAuthPortService, // ::
    P.AdminCommPortService,
    P.ClientAuthPortService,
    P.ClientChatPortService,
    P.ClientClubPortService,
    P.ClientCommPortService,
    P.ClientDocPortService,
    P.JwtPortService
  ]
})
export class DatabaseModule {}
