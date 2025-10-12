import {Module} from '@nestjs/common'

import {ClientAuthModule} from './client.auth'
import {ClientCommModule} from './client.comm'

@Module({
  imports: [ClientAuthModule, ClientCommModule],
  controllers: [],
  providers: [],
  exports: []
})
export class ClientModule {}
