import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { FirebaseService } from '../../firebase/firebase.service';
import { UsersRepository } from '../../users/users.repository/users.repository';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersRepository: UsersRepository,
  ) {}

 async canActivate(
  context: ExecutionContext,
): Promise<boolean> {
  const request = context.switchToHttp().getRequest();

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedException(
      'Authorization header missing.',
    );
  }

  const token = authHeader.replace('Bearer ', '');

  const decodedToken =
    await this.firebaseService
      .getAuth()
      .verifyIdToken(token);

  const user =
    await this.usersRepository.findByFirebaseUid(
      decodedToken.uid,
    );

  if (!user) {
    throw new UnauthorizedException(
      'Employee profile not found.',
    );
  }

  request.user = user;

  return true;
}
}