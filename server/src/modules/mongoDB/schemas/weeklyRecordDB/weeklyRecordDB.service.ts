import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {RecordColInfo, RecordDateInfo, RecordMemberInfo, RecordRowInfo, WeeklyRecord} from './weeklyRecordDB.entity'
import {Model, Types} from 'mongoose'

@Injectable()
export class WeeklyRecordDBService {
  constructor(
    @InjectModel(WeeklyRecord.name) private weeklyModel: Model<WeeklyRecord>,
    @InjectModel(RecordRowInfo.name) private rowModel: Model<RecordRowInfo>,
    @InjectModel(RecordMemberInfo.name) private memberModel: Model<RecordMemberInfo>,
    @InjectModel(RecordColInfo.name) private colModel: Model<RecordColInfo>,
    @InjectModel(RecordDateInfo.name) private dateModel: Model<RecordDateInfo>
  ) {}

  async readWeeklyRecordArr() {
    try {
      const weeklyRecordArr = await this.weeklyModel.find().sort({name: 1})
      return {weeklyRecordArr}
    } catch (errObj) {
      console.log(`  [WeeklyRecordMongoDB] readWeeklyRecordArr Error: ${errObj}`)
      if (typeof errObj === 'string') {
        Object.keys(errObj).forEach(key => {
          console.log(`  [WeeklyRecordMongoDB] ${key}: ${errObj[key]}`)
        })
      }
      throw errObj
    }
  }
}
