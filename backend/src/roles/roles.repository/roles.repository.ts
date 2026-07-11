import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';
import { FieldValue } from 'firebase-admin/firestore';
import { QueryRolesDto } from '../dto/query-roles.dto';

@Injectable()
export class RolesRepository {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {}
  async createRole(
  roleId: string,
  roleData: any,
): Promise<void> {
  const db = this.firebaseService.getFirestore();

  await db
    .collection('roles')
    .doc(roleId)
    .set({
      ...roleData,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
}
    async findById(roleId: string) {
  const db = this.firebaseService.getFirestore();

  const doc = await db
    .collection('roles')
    .doc(roleId)
    .get();

  if (!doc.exists) {
    return null;
  }

  return doc.data();
}
    async findByRoleId(roleId: string) {
  const db = this.firebaseService.getFirestore();

  const snapshot = await db
    .collection('roles')
    .where('roleId', '==', roleId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data();
}
    async findAll(query: QueryRolesDto) {
  const db = this.firebaseService.getFirestore();

  const snapshot = await db
    .collection('roles')
    .orderBy('createdAt', 'desc')
    .get();

  let roles = snapshot.docs.map(doc => doc.data());

  // Search
  if (query.search) {
    const search = query.search.toLowerCase();

    roles = roles.filter(role =>
      role.roleId?.toLowerCase().includes(search) ||
      role.name?.toLowerCase().includes(search) ||
      role.description?.toLowerCase().includes(search),
    );
  }

  // Filter by active status
  if (query.isActive !== undefined) {
    const isActive = query.isActive === 'true';

    roles = roles.filter(
      role => role.isActive === isActive,
    );
  }

  // Sorting
  if (query.sortBy) {
    const sortBy = query.sortBy;
    const order = query.order === 'desc' ? -1 : 1;

    roles.sort((a: any, b: any) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (valueA == null) return 1;
      if (valueB == null) return -1;

      if (valueA > valueB) return order;
      if (valueA < valueB) return -order;

      return 0;
    });
  }

  // Pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedRoles =
    roles.slice(startIndex, endIndex);

  return {
    total: roles.length,
    page,
    limit,
    totalPages: Math.ceil(roles.length / limit),
    data: paginatedRoles,
  };
}
  async updateRole(
  roleId: string,
  updateData: any,
): Promise<void> {
  const db = this.firebaseService.getFirestore();

  await db
    .collection('roles')
    .doc(roleId)
    .update({
      ...updateData,
      updatedAt: FieldValue.serverTimestamp(),
    });
}
  async deactivateRole(
  roleId: string,
): Promise<void> {
  const db = this.firebaseService.getFirestore();

  await db
    .collection('roles')
    .doc(roleId)
    .update({
      isActive: false,
      updatedAt: FieldValue.serverTimestamp(),
    });
}
  async reactivateRole(
  roleId: string,
): Promise<void> {
  const db = this.firebaseService.getFirestore();

  await db
    .collection('roles')
    .doc(roleId)
    .update({
      isActive: true,
      updatedAt: FieldValue.serverTimestamp(),
    });
}
}