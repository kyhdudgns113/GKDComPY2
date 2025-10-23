import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model, Types} from 'mongoose'
import {Community} from './communityDB.entity'

@Injectable()
export class CommunityDBService {
  constructor(@InjectModel(Community.name) private commModel: Model<Community>) {}

  async readCommunityArr() {
    try {
      const communityArr = await this.commModel.find().sort({name: 1})
      return {communityArr}
      // ::
    } catch (errObj) {
      // ::
      console.log(`  [CommunityMongoDB] readCommunityArr Error: ${errObj}`)
      if (typeof errObj === 'string') {
        Object.keys(errObj).forEach(key => {
          console.log(`  [CommunityMongoDB] ${key}: ${errObj[key]}`)
        })
      }
      throw errObj
    }
  }
}
