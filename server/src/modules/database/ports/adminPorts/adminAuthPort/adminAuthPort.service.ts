import {Injectable} from '@nestjs/common'
import {DBHubService} from '@modules/database/dbHub'

@Injectable()
export class AdminAuthPortService {
  constructor(private readonly dbHubService: DBHubService) {}
}
