import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://pd-flashcards-app.netlify.app',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
