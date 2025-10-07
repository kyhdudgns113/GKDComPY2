import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as T from '@type'

@Injectable()
export class DailyRecordDBService {
  constructor(private readonly dbService: DBService) {}
}
