import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { GeckoController } from './gecko.controller';
import { GeckoService } from './gecko.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [GeckoController],
  providers: [GeckoService],
})
export class GeckoModule {}