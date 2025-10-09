import {Module} from '@nestjs/common'
import {AdminAuthModule} from './admin.auth'
import {AdminCommunityModule} from './admin.community'

@Module({
  imports: [AdminAuthModule, AdminCommunityModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AdminModule {}
