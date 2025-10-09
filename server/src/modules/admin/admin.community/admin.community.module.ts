import {Module} from '@nestjs/common'
import {AdminCommunityService} from './admin.community.service'
import {AdminCommunityController} from './admin.community.controller'
import {DatabaseModule} from '@modules/database/database.module'
import {GKDJwtModule} from '@modules/gkdJwt'

@Module({
  imports: [DatabaseModule, GKDJwtModule],
  controllers: [AdminCommunityController],
  providers: [AdminCommunityService],
  exports: [AdminCommunityService]
})
export class AdminCommunityModule {}
