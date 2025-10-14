import {Module} from '@nestjs/common'
import {SocketGateway} from './socket.gateway'
import {SocketInfoService} from './socket.info.service'
import {SocketService} from './socket.service'

@Module({
  imports: [],
  controllers: [],
  providers: [SocketGateway, SocketInfoService, SocketService],
  exports: [SocketService]
})
export class SocketModule {}
