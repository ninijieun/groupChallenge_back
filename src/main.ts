import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  // TODO 환경에 따른 설정 자동화 체크
  const app = await NestFactory.create(AppModule, {
    logger: ['debug','error','log','warn'] 
  });

  //======== swagger ========================
  const config = new DocumentBuilder()
    .setTitle('GroupChallenge')
    .setDescription('The GroupChallenge API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //======== swagger ========================

  await app.listen(3000); // 포트 listen

  //======== hot reload ========================
  // TODO error check
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  //======== hot reload ========================
}
bootstrap();
