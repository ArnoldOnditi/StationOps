import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { FirebaseService } from '../firebase/firebase.service';
import { UsersRepository } from '../users/users.repository/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async verifyToken(token: string) {
    try {
      // Verify Firebase ID token
      const decoded =
        await this.firebaseService
          .getAuth()
          .verifyIdToken(token);

      // Find employee profile
      const user =
        await this.usersRepository.findByFirebaseUid(
          decoded.uid,
        );

      if (!user) {
        throw new UnauthorizedException(
          'Employee profile not found.',
        );
      }

      return user;
    } catch {
      throw new UnauthorizedException(
        'Invalid authentication token.',
      );
    }
  }
}