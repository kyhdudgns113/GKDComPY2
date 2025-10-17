import {Module} from '@nestjs/common'
import {WorkerService} from './worker.service'
import {WorkerController} from './worker.controller'
import {ScheduleModule} from '@nestjs/schedule'
@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService]
})
export class WorkerModule {}
