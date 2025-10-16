import {Module} from '@nestjs/common'
import {WorkerService} from './worker.service'
import {WorkerController} from './worker.controller'

@Module({
  imports: [],
  controllers: [WorkerController],
  providers: [WorkerService],
  exports: [WorkerService]
})
export class WorkerModule {}
