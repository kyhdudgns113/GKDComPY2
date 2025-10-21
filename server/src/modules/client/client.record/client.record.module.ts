import {Module} from '@nestjs/common'
import {ClientRecordController} from './client.record.controller'
import {ClientRecordService} from './client.record.service'
import {DatabaseModule} from '@modules/database/database.module'
import {GKDJwtModule} from '@modules/gkdJwt/gkdJwt.module'

@Module({
  imports: [DatabaseModule, GKDJwtModule],
  controllers: [ClientRecordController],
  providers: [ClientRecordService],
  exports: [ClientRecordService]
})
export class ClientRecordModule {}
