import {Module} from '@nestjs/common'
import {ClientChatController} from './client.chat.controller'
import {ClientChatService} from './client.chat.service'
import {DatabaseModule} from '@modules/database/database.module'
import {GKDJwtModule} from '@modules/gkdJwt/gkdJwt.module'

@Module({
  imports: [DatabaseModule, GKDJwtModule],
  controllers: [ClientChatController],
  providers: [ClientChatService],
  exports: [ClientChatService]
})
export class ClientChatModule {}
