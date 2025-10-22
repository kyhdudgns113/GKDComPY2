import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model, Types} from 'mongoose'
import {Chat, ChatRoom} from './chatDB.entity'
import {ChatRoomType, ChatType} from '../../../../common/types'

@Injectable()
export class ChatDBService {
  constructor(
    @InjectModel(ChatRoom.name) private roomModel: Model<ChatRoom>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>
  ) {}

  async readChatRoomArr() {
    try {
      const chatRoomArr = await this.roomModel.find().sort({name: 1})
      return {chatRoomArr}
    } catch (errObj) {
      console.log(`  [ChatMongoDB] readChatRoomArr Error: ${errObj}`)
      if (typeof errObj === 'string') {
        Object.keys(errObj).forEach(key => {
          console.log(`  [ChatMongoDB] ${key}: ${errObj[key]}`)
        })
      }
      throw errObj
    }
  }

  async readChatArr() {
    try {
      const chatArr = await this.chatModel.find().sort({name: 1})
      return {chatArr}
    } catch (errObj) {
      console.log(`  [ChatMongoDB] readChatArr Error: ${errObj}`)
      if (typeof errObj === 'string') {
        Object.keys(errObj).forEach(key => {
          console.log(`  [ChatMongoDB] ${key}: ${errObj[key]}`)
        })
      }
      throw errObj
    }
  }
}
