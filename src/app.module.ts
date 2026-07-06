import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { HistoricoModule } from './modules/historico/historico.module';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: ['.env'],
});

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'oracle',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
      autoLoadEntities: true,
      logging: true,
      synchronize: false,
    }),
    HistoricoModule
  ],
})
export class AppModule { }
