import {Body, Controller, Get, Headers, Param, Post} from '@nestjs/common'
import {WorkerService} from './worker.service'

@Controller('/worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}
}
