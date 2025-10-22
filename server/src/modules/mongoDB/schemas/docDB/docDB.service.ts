import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model, Types} from 'mongoose'
import {GDocument} from './docDB.entity'

@Injectable()
export class GDocumentDBService {
  constructor(@InjectModel(GDocument.name) private docModel: Model<GDocument>) {}

  async readGDocumentArr() {
    try {
      const gDocumentArr = await this.docModel.find().sort({name: 1})
      return {gDocumentArr}
    } catch (errObj) {
      console.log(`  [GDocumentMongoDB] readGDocumentArr Error: ${errObj}`)
      if (typeof errObj === 'string') {
        Object.keys(errObj).forEach(key => {
          console.log(`  [GDocumentMongoDB] ${key}: ${errObj[key]}`)
        })
      }
      throw errObj
    }
  }
}
