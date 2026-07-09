import { Injectable } from '@nestjs/common';
import { FieldValue } from 'firebase-admin/firestore';

import { FirebaseService } from '../../firebase/firebase.service';
import { CreateAuditLogDto } from '../dto/create-audit-log.dto';

@Injectable()
export class AuditRepository {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}

  async createAuditLog(
    audit: CreateAuditLogDto,
  ): Promise<void> {
    const db = this.firebaseService.getFirestore();

    await db
      .collection('audit_logs')
      .doc(audit.auditId)
      .set({
        ...audit,
        createdAt: FieldValue.serverTimestamp(),
      });
  }
}