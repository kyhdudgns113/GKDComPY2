import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model, Types} from 'mongoose'
import {Club, WeekRow} from './clubDB.entity'

@Injectable()
export class ClubDBService {
  constructor(
    @InjectModel(Club.name) private clubModel: Model<Club>,
    @InjectModel(WeekRow.name) private weekRowModel: Model<WeekRow>
  ) {}

  async readClubArr() {
    try {
      const clubArr = await this.clubModel.find().sort({name: 1})
      return {clubArr}
    } catch (errObj) {
      console.log(`  [ClubMongoDB] readClubArr Error: ${errObj}`)
      if (typeof errObj === 'string') {
        Object.keys(errObj).forEach(key => {
          console.log(`  [ClubMongoDB] ${key}: ${errObj[key]}`)
        })
      }
      throw errObj
    }
  }

  async readWeekRowArr() {
    try {
      const weekRowArr = await this.weekRowModel.find().sort({name: 1})
      return {weekRowArr}
    } catch (errObj) {
      console.log(`  [ClubMongoDB] readWeekRowArr Error: ${errObj}`)
      if (typeof errObj === 'string') {
        Object.keys(errObj).forEach(key => {
          console.log(`  [ClubMongoDB] ${key}: ${errObj[key]}`)
        })
      }
      throw errObj
    }
  }
}
