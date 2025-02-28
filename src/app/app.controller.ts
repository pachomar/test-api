import { Controller, Get, Req, Version } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { Request } from 'express';
import { RestConfig } from 'src/rest/rest-config';

@Controller(RestConfig.appRoute)
export class AppController {
  constructor(private appService: AppService) {}

  @Version('1')
  @Get()
  healthCheck() {
    return this.appService.getHealthCheck();
  }

  @Version('1')
  @Get(RestConfig.appVersionRoute)
  version(@Req() req: Request) {
    return this.appService.getVersion(req);
  }
}
