import {Injectable} from '@nestjs/common'
import {Model, Types} from 'mongoose'
import {Card, Member} from './memberDB.entity'
import {InjectModel} from '@nestjs/mongoose'

@Injectable()
export class MemberDBService {
  constructor(
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
    @InjectModel(Card.name) private readonly cardModel: Model<Card>
  ) {}

  async readMemberArr() {
    try {
      const memberArr = await this.memberModel.find().sort({name: 1})
      return {memberArr}
    } catch (errObj) {
      console.log(`  [MemberMongoDB] readMemberArr Error: ${errObj}`)
      if (typeof errObj === 'string') {
        Object.keys(errObj).forEach(key => {
          console.log(`  [MemberMongoDB] ${key}: ${errObj[key]}`)
        })
      }
      throw errObj
    }
  }
}
