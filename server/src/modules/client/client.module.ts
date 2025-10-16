import {Module} from '@nestjs/common'

import {ClientAuthModule} from './client.auth'
import {ClientChatModule} from './client.chat'
import {ClientClubModule} from './client.club'
import {ClientCommModule} from './client.comm'
import {ClientDocumentModule} from './client.document'
import {ClientMemberModule} from './client.member'
import {ClientRecordModule} from './client.record'

@Module({
  imports: [
    ClientAuthModule, // ::
    ClientChatModule,
    ClientCommModule,
    ClientClubModule,
    ClientDocumentModule,
    ClientMemberModule,
    ClientRecordModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class ClientModule {}
