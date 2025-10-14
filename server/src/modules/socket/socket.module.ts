import {Module} from '@nestjs/common'
import {SocketGateway} from './socket.gateway'
import {SocketInfoService} from './socket.info.service'
import {SocketService} from './socket.service'
import {GKDJwtModule} from '@modules/gkdJwt'
import {SocketGatewayService} from './socket.gateway.service'
import {DatabaseModule} from '@modules/database'

@Module({
  imports: [DatabaseModule, GKDJwtModule],
  controllers: [],
  providers: [SocketGateway, SocketInfoService, SocketService, SocketGatewayService],
  exports: [SocketService]
})
export class SocketModule {}
