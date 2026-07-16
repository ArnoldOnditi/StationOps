import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class StationsRepository {
  private readonly collection;

  constructor(
    private readonly firebaseService: FirebaseService,
  ) {
    this.collection =
      this.firebaseService
        .getFirestore()
        .collection('stations');
  }
  async createStation(station: any): Promise<any> {
  await this.collection
    .doc(station.stationId)
    .set(station);

  return station;
}
async findByCode(code: string): Promise<any> {
  const snapshot = await this.collection
    .where('code', '==', code)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data();
}
async findById(stationId: string): Promise<any> {
  const document = await this.collection
    .doc(stationId)
    .get();

  if (!document.exists) {
    return null;
  }

  return document.data();
}
async findAll(): Promise<any[]> {
  const snapshot = await this.collection.get();

  return snapshot.docs.map((doc) => doc.data());
}
}