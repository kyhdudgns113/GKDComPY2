import {Module} from '@nestjs/common'
import {AppController} from './app.controller'

import * as M from './modules'

@Module({
  imports: [
    M.AdminModule, // ::
    M.ClientModule,
    M.DatabaseModule,
    M.SocketModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
