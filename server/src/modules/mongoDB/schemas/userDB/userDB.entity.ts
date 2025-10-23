import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document, Types} from 'mongoose'

@Schema()
export class User extends Document {
  /** Object Id is in extended class Document */

  /** User ID. Not ObjectId */
  declare readonly _id: Types.ObjectId
  @Prop({type: String, required: true, unique: true})
  declare id: string

  @Prop({type: String, required: true})
  hashedPassword: string

  @Prop({type: String, default: 'admin', required: true})
  commOId: string

  @Prop({type: Object, default: {}})
  unreadMessages: {[chatRoomOId: string]: number}
}

export const UserSchema = SchemaFactory.createForClass(User)
