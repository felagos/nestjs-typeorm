import { Controller, Get } from '@nestjs/common';

@Controller('ping')
export class PingController {
  @Get()
  doPing() {
    return 'server is up and running';
  }
}
