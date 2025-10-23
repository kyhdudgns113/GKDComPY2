import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {User} from './userDB.entity'
import {Model, Types} from 'mongoose'

@Injectable()
export class UserDBService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async readUserArr() {
    try {
      const userArr = await this.userModel.find().sort({name: 1})
      return {userArr}
    } catch (errObj) {
      console.log(`  [UserMongoDB] readUserArr Error: ${errObj}`)
      if (typeof errObj === 'string') {
        Object.keys(errObj).forEach(key => {
          console.log(`  [UserMongoDB] ${key}: ${errObj[key]}`)
        })
      }
      throw errObj
    }
  }
}
