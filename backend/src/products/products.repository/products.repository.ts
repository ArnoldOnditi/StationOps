import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class ProductsRepository {
  private readonly collection;

  constructor(
    private readonly firebaseService: FirebaseService,
  ) {
    this.collection =
      this.firebaseService
        .getFirestore()
        .collection('products');
  }

  async createProduct(
    productId: string,
    product: any,
  ) {
    await this.collection
      .doc(productId)
      .set(product);
  }

  async findById(productId: string) {
    const snapshot =
      await this.collection
        .doc(productId)
        .get();

    if (!snapshot.exists) {
      return null;
    }

    return snapshot.data();
  }

  async findByCode(code: string) {
    const snapshot =
      await this.collection
        .where('code', '==', code)
        .limit(1)
        .get();

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data();
  }
}