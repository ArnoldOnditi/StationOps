import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { FirebaseAuthGuard } from './guards/firebase-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('me')
@UseGuards(FirebaseAuthGuard)
getProfile(@Req() req: any) {
  return {
    success: true,
    user: {
      userId: req.user.userId,
      employeeNumber: req.user.employeeNumber,
      fullName: req.user.fullName,
      email: req.user.email,
      roleId: req.user.roleId,
      stationId: req.user.stationId,
      employmentStatus: req.user.employmentStatus,
    },
  };
}
}