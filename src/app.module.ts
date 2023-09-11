import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseConfigModule } from './database/database-config.module';
import { ConfigEnvModule } from './config/config.module';

@Module({
  imports: [ConfigEnvModule, DatabaseConfigModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
