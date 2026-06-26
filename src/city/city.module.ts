import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [CacheModule.register({ ttl: 60 * 60 * 1000 }), AuthModule],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule {}
