import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {User} from './userDB.entity'
import {Model, Types} from 'mongoose'

@Injectable()
export class UserDBService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async readUserArr() {
    try {
      const userArr = await this.userModel.find()

      const user = userArr[0]

      console.log(`  [UserMongoDB] user: ${user}`)
      Object.keys(user).forEach(key => {
        console.log(`  [UserMongoDB] ${key}: ${user[key]}`)
      })

      return {userArr}
      // ::
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
