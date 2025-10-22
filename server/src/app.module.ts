import {Module} from '@nestjs/common'
import {AppController} from './app.controller'

import * as M from './modules'
import {MongooseModule} from '@nestjs/mongoose'
import {mongodbUrl} from '@secret'

@Module({
  imports: [
    M.AdminModule, // ::
    M.ClientModule,
    M.SocketModule,
    M.WorkerModule,
    MongooseModule.forRoot(mongodbUrl)
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
