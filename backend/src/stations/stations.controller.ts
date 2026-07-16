import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';

import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { Permission } from 'src/auth/enums/permission.enum';


@Controller('stations')
export class StationsController {
    constructor(
  private readonly stationsService: StationsService,
) {}
    @Post()
@UseGuards(FirebaseAuthGuard, PermissionsGuard)
@Permissions(Permission.STATION_CREATE)
async create(
  @Body() dto: CreateStationDto,
  @Req() req: any,
) {
  return this.stationsService.createStation(
    dto,
    req.user,
  );
}
}
    
