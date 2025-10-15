import {Module} from '@nestjs/common'
import {ClientDocumentController} from './client.document.controller'
import {ClientDocumentService} from './client.document.service'
import {DatabaseModule} from '@modules/database/database.module'
import {GKDJwtModule} from '@modules/gkdJwt/gkdJwt.module'

@Module({
  imports: [DatabaseModule, GKDJwtModule],
  controllers: [ClientDocumentController],
  providers: [ClientDocumentService],
  exports: [ClientDocumentService]
})
export class ClientDocumentModule {}
