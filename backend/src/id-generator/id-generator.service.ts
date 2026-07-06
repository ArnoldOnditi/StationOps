import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class IdGeneratorService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async generateId(prefix: string): Promise<string> {
    const db = this.firebaseService.getFirestore();

    const counterRef = db.collection('system').doc(`${prefix}_COUNTER`);

    const nextNumber = await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(counterRef);

      let currentNumber = 0;

      if (snapshot.exists) {
        currentNumber = snapshot.data()?.currentNumber ?? 0;
      }

      const newNumber = currentNumber + 1;

      transaction.set(counterRef, {
        currentNumber: newNumber,
        updatedAt: new Date(),
      });

      return newNumber;
    });

    return `${prefix}${nextNumber.toString().padStart(6, '0')}`;
  }
}