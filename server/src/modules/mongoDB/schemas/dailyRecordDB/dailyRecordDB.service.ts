import {Injectable} from '@nestjs/common'
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {DailyRecord, RecordBlock} from './dailyRecordDB.entity'

@Injectable()
export class DailyRecordDBService {
  constructor(
    @InjectModel(DailyRecord.name) private readonly dailyRecordModel: Model<DailyRecord>,
    @InjectModel(RecordBlock.name) private readonly recordBlockModel: Model<RecordBlock>
  ) {}

  async readDailyRecordArr() {
    try {
      const dailyRecordArr = await this.dailyRecordModel.find().limit(1000000)
      return {dailyRecordArr}
    } catch (errObj) {
      console.log(`  [DailyRecordMongoDB] readDailyRecordArr Error: ${errObj}`)
      if (typeof errObj === 'string') {
        Object.keys(errObj).forEach(key => {
          console.log(`  [DailyRecordMongoDB] ${key}: ${errObj[key]}`)
        })
      }
      throw errObj
    }
  }
}
