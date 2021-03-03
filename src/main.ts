import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const allowlist = 'http://localhost:3000';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: allowlist,
        credentials: true, // cors
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(8080);
}
bootstrap();
