import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NATS_SERVER } from './config';
import { AppModule } from './AppModule';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.NATS, //Here we define the broker or events emitter
    // transport: Transport.RMQ,
    options: {
      servers: NATS_SERVER,
      // urls: ['URL AQUI'],
      // queue: 'Name_queue',
      // queueOptions: {
      //   durable: false
      // }
    }
  });
  app.useGlobalPipes( //this use for validate and transform the into data
    new ValidationPipe({
      // whitelist: true, // this option delete automaticatly the properties that isn't defined in the DTO
      transform: true, //this option transform the into data on DTO instances
      forbidNonWhitelisted: true //This option push a error if the into object contain properties that are not defined in the DTO
    })
  );
  Logger.log("User-Microservice started");
  await app.listen();
}
bootstrap();
