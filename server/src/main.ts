import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {CorsOptions} from '@nestjs/common/interfaces/external/cors-options.interface'
import {adminURL, clientURL, serverPort} from './common/secret'
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger'

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule)
    // CORS 설정
    const corsOptions: CorsOptions = {
      origin: [adminURL, clientURL],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true
    }

    app.enableCors(corsOptions)

    // Swagger 설정
    const config = new DocumentBuilder()
      .setTitle('KYHBlog API')
      .setDescription('KYHBlog API Description')
      .setVersion('1.0') // ::
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    // 서버 실행
    await app
      .listen(serverPort) // ::
      .catch(errObj => {
        console.log(`\n\n[main.ts] listen 에서 에러 발생: ${errObj}`)

        Object.keys(errObj).forEach(key => {
          console.log(`   ${key}: ${errObj[key]}`)
        })
      })
      .finally(() => {
        console.log(`\n    [GKDComPY] 서버 실행 완료!!`)
        console.log(`    [GKDComPY] 포트: ${serverPort}`)
        console.log(`    [GKDComPY] 초기화 작업이 백그라운드에서 실행됩니다...\n`)
      })
    // ::
  } catch (errObj) {
    // ::
    console.log(`\n\n[main.ts] 에러 발생: ${errObj}`)

    if (typeof errObj !== 'string') {
      Object.keys(errObj).forEach(key => {
        console.log(`   ${key}: ${errObj[key]}`)
      })
    }

    throw errObj
  }
}

bootstrap()
