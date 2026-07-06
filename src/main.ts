import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const oracledb = require('oracledb');

async function bootstrap() {
    if (process.env.ORACLE_CLIENT_PATH) {
        try {
            oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_PATH });
            console.log('✅ Oracle Thick mode enabled');
        } catch (err) {
            console.error('❌ Error initializing Oracle client', err);
        }
    }

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('API de Histórico de Autorização')
        .setDescription('APIs para consulta de Permissionários, Motoristas e Veículos a partir do banco Oracle')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 8080);
    console.log(`Application is running on: http://localhost:${process.env.PORT ?? 8080}`);
    console.log(`Swagger docs at: http://localhost:${process.env.PORT ?? 8080}/api`);
}

bootstrap();
