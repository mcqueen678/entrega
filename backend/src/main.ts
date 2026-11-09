import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  const config = new DocumentBuilder()
  .setTitle('Api de Productos')
  .setDescription('Proyecto ejemplo')
  .setVersion('1.0')
  .build();
  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app,config))
  const port = process.env.Port ?? 3000
  await app.listen(port);
  console.log(`API lista en http://localhost:${port}/api Docs ; http://localhost:${port}/Docs`);
}
await bootstrap();
