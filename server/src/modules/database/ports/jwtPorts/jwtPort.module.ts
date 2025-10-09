import {Module} from '@nestjs/common'
import {JwtPortService} from './jwtPort.service'
import {DBHubModule} from '@modules/database/dbHub'

@Module({
  imports: [DBHubModule],
  controllers: [],
  providers: [JwtPortService],
  exports: [JwtPortService]
})
export class JwtPortModule {}
