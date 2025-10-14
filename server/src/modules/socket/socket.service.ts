import {Injectable} from '@nestjs/common'
import {SocketGateway} from './socket.gateway'
import {SocketInfoService} from './socket.info.service'

import * as T from '@type'

/**
 * SocketService
 *   - 다른 모듈에서 소켓을 사용할때 쓴다.
 */
@Injectable()
export class SocketService {
  constructor(
    private readonly gateway: SocketGateway,
    private readonly infoService: SocketInfoService
  ) {}
}
