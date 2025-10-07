import {Module} from '@nestjs/common'
import {AdminAuthModule} from './admin.auth'

@Module({
  imports: [AdminAuthModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AdminModule {}
