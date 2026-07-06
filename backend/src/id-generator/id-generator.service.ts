import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class IdGeneratorService {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async generateId(prefix: string): Promise<string> {
    // We'll implement this in the next step
    return `${prefix}000001`;
  }
}