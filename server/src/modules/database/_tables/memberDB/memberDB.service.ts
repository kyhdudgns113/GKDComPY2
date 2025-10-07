import {Injectable} from '@nestjs/common'
import {RowDataPacket} from 'mysql2'
import {generateObjectId} from '@util'
import {DBService} from '../_db'

import * as T from '@type'

@Injectable()
export class MemberDBService {
  constructor(private readonly dbService: DBService) {}
}
