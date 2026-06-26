import { Module } from '@nestjs/common';
import { LocationPageController } from './location-page.controller';
import { LocationPageService } from './location-page.service';

@Module({
  controllers: [LocationPageController],
  providers: [LocationPageService]
})
export class LocationPageModule {}
