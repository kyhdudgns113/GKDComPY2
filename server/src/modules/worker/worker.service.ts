import {Injectable} from '@nestjs/common'
import {Cron} from '@nestjs/schedule'
import {JwtPayloadType} from '@type'

@Injectable()
export class WorkerService {
  constructor() {}

  @Cron('0 * * * * *', {
    timeZone: 'Asia/Seoul'
  })
  everyMinute() {
    const now = new Date()
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')

    console.log(`[Worker]: 서버의 현재 시각은 ${hour}:${minute}`)
  }
}
