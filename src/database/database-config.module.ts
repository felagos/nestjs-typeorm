import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        database: config.get<string>('POSTGRES_DB'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        autoLoadEntities: true,
        synchronize: config.get<string>('ENV') === 'dev',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseConfigModule {}
