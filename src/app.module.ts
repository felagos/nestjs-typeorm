import { Module } from '@nestjs/common';
import { DatabaseConfigModule } from './database-config/database-config.module';
import { ConfigEnvModule } from './config-env/config.module';

@Module({
  imports: [ConfigEnvModule, DatabaseConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
