import { Module } from '@nestjs/common';

import { ConfigEnvModule } from './config/config.module';
import { DatabaseConfigModule } from './database/database-config.module';
import { PingModule } from './ping/ping.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigEnvModule, DatabaseConfigModule, ProductsModule, PingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
