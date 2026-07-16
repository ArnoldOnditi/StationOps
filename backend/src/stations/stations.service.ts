import {
  ConflictException,
  Injectable,
} from '@nestjs/common';

import { StationsRepository } from './stations.repository/stations.repository';
import { IdGeneratorService } from '../id-generator/id-generator.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class StationsService {
  constructor(
    private readonly stationsRepository: StationsRepository,
    private readonly idGeneratorService: IdGeneratorService,
    private readonly auditService: AuditService,
  ) {}

  async createStation(dto: any, user: any) {
  const existingStation =
    await this.stationsRepository.findByCode(dto.code);

  if (existingStation) {
    throw new ConflictException(
      'Station code already exists.',
    );
  }
  const stationId = await this.idGeneratorService.generateId('STN');
  const station = {
  stationId,
  code: dto.code,
  name: dto.name,
  address: dto.address,
  phone: dto.phone,
  email: dto.email,
  status: 'ACTIVE',
  createdBy: user.userId,
  createdAt: new Date(),
  updatedAt: new Date(),
};
const savedStation =
  await this.stationsRepository.createStation(station);
  await this.auditService.logAction({
  module: 'Stations',
  action: 'CREATE_STATION',
  performedBy: user.userId,
  targetId: stationId,
  description: `Created station ${dto.name} (${dto.code})`,
  changes: {
    stationId,
    code: dto.code,
    name: dto.name,
    status: 'ACTIVE',
  },
});
return {
  success: true,
  message: 'Station created successfully.',
  data: savedStation,
};
}

}