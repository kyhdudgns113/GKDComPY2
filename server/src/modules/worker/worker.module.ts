import {Module} from '@nestjs/common'
import {WorkerService} from './worker.service'
import {WorkerController} from './worker.controller'
import {ScheduleModule} from '@nestjs/schedule'
import {MongoDBModule} from '@modules/mongoDB'
import {DatabaseModule} from '@modules/database'
import {DBModule} from '@modules/database/_tables/_db'
@Module({
  imports: [
    DBModule,
    MongoDBModule, // ::
    ScheduleModule.forRoot()
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService]
})
export class WorkerModule {}
