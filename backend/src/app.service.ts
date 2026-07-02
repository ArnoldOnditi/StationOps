import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Welcome to StationOps API',
      version: '1.0.0',
      status: 'Running',
    };
  }
}