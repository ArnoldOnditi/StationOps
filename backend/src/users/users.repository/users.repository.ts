import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class UsersRepository {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async createUser(userId: string, userData: any): Promise<void> {
    const db = this.firebaseService.getFirestore();

    await db
      .collection('users')
      .doc(userId)
      .set(userData);
  }
}