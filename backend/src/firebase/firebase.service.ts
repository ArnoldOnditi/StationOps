import { Injectable } from '@nestjs/common';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth, Auth } from 'firebase-admin/auth';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { FirebaseEmailExistsException } from '../common/exceptions/firebase.exception';

import serviceAccount from '../../firebase/service-account.json';

@Injectable()
export class FirebaseService {
  private readonly auth: Auth;
  private readonly firestore: Firestore;
  
  constructor() {
    if (getApps().length === 0) {
      initializeApp({
        credential: cert(serviceAccount as any),
      });

      console.log('🔥 Firebase Admin initialized successfully');
    }

    this.auth = getAuth();
    this.firestore = getFirestore();

    console.log('✅ Firebase Authentication ready');
    console.log('✅ Firestore ready');
  }

  getAuth() {
  return this.auth;
}


  getFirestore(): Firestore {
    return this.firestore;
  }

  async createAuthUser(
    email: string,
    password: string,
    displayName: string,
  ) {
    try{
      return await this.auth.createUser({
        email,
        password,
        displayName,
        emailVerified: false,
        disabled: false,
    });
  } catch (error: any){
    if (error.code === 'auth/email-already-exists') {
      throw new FirebaseEmailExistsException();
    }
    throw error;
  }
}
}