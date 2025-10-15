import {Module} from '@nestjs/common'

import {ClientAuthModule} from './client.auth'
import {ClientChatModule} from './client.chat'
import {ClientClubModule} from './client.club'
import {ClientCommModule} from './client.comm'
import {ClientDocumentModule} from './client.document'
import {ClientMemberModule} from './client.member'

@Module({
  imports: [
    ClientAuthModule, // ::
    ClientChatModule,
    ClientCommModule,
    ClientClubModule,
    ClientDocumentModule,
    ClientMemberModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class ClientModule {}
