import {Module} from '@nestjs/common'

import {ClientAuthModule} from './client.auth'
import {ClientClubModule} from './client.club'
import {ClientCommModule} from './client.comm'
import {ClientDocumentModule} from './client.document'

@Module({
  imports: [
    ClientAuthModule, // ::
    ClientCommModule,
    ClientClubModule,
    ClientDocumentModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class ClientModule {}
