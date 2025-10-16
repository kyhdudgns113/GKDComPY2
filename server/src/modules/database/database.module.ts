import {Module} from '@nestjs/common'
import {GKDLockModule} from '@modules/gkdLock'
import {DBHubModule} from './dbHub'

import * as P from './ports'

@Module({
  imports: [
    DBHubModule,
    GKDLockModule,
    // ::
    P.AdminPortsModule,
    P.ClientPortsModule,
    P.JwtPortModule,
    P.SocketPortModule
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
    P.ClientMemberPortService,
    P.ClientRecordPortService,
    P.JwtPortService,
    P.SocketPortService
  ],
  exports: [
    P.AdminAuthPortService, // ::
    P.AdminCommPortService,
    P.ClientAuthPortService,
    P.ClientChatPortService,
    P.ClientClubPortService,
    P.ClientCommPortService,
    P.ClientDocPortService,
    P.ClientMemberPortService,
    P.ClientRecordPortService,
    P.JwtPortService,
    P.SocketPortService
  ]
})
export class DatabaseModule {}
