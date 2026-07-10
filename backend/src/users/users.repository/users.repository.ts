import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../../firebase/firebase.service';
import { FieldValue } from 'firebase-admin/firestore';
import { EmploymentStatus } from '../enums/employment-status.enum';
import { QueryUsersDto } from '../dto/query-users.dto';

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
      .set({
        ...userData,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
  }
  async findByEmployeeNumber(employeeNumber: string) {
  const db = this.firebaseService.getFirestore();

  const snapshot = await db
    .collection('users')
    .where('employeeNumber', '==', employeeNumber)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data();
}
  async findById(userId: string) {
    const db = this.firebaseService.getFirestore();

    const doc = await db
      .collection('users')
      .doc(userId)
      .get();

    if (!doc.exists) {
      return null;
    }

    return doc.data();
  }

  async findAll(query: QueryUsersDto) {
  const db = this.firebaseService.getFirestore();

  const snapshot = await db
    .collection('users')
    .orderBy('createdAt', 'desc')
    .get();

  let users = snapshot.docs.map(doc => doc.data());

  // Search
  if (query.search) {
    const search = query.search.toLowerCase();

    users = users.filter(user =>
      user.employeeNumber?.toLowerCase().includes(search) ||
      user.firstName?.toLowerCase().includes(search) ||
      user.lastName?.toLowerCase().includes(search) ||
      user.fullName?.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search),
    );
  }
  // Filter by station
if (query.stationId) {
  users = users.filter(
    user => user.stationId === query.stationId,
  );
}

// Filter by role
if (query.roleId) {
  users = users.filter(
    user => user.roleId === query.roleId,
  );
}

// Filter by employment status
if (query.employmentStatus) {
  users = users.filter(
    user =>
      user.employmentStatus ===
      query.employmentStatus,
  );
}
// Sorting
if (query.sortBy) {
  const sortBy = query.sortBy;
  const order = query.order === 'desc' ? -1 : 1;

  users.sort((a: any, b: any) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (valueA == null) return 1;
    if (valueB == null) return -1;

    if (valueA > valueB) return order;
    if (valueA < valueB) return -order;

    return 0;
  });
}
//Pagination 
  const page = Number(query.page) || 1;
const limit = Number(query.limit) || 10;

const startIndex = (page - 1) * limit;
const endIndex = startIndex + limit;

const paginatedUsers = users.slice(startIndex, endIndex);

return {
  total: users.length,
  page,
  limit,
  totalPages: Math.ceil(users.length / limit),
  data: paginatedUsers,
};
}

  async updateUser(userId: string, updateData: any): Promise<void> {
    const db = this.firebaseService.getFirestore();

    await db
      .collection('users')
      .doc(userId)
      .update({
        ...updateData,
        updatedAt: FieldValue.serverTimestamp(),
      });
  }
  async deactivateUser(userId: string): Promise<void> {
  const db = this.firebaseService.getFirestore();

  await db
    .collection('users')
    .doc(userId)
    .update({
      employmentStatus: 'INACTIVE',
      updatedAt: FieldValue.serverTimestamp(),
    });
}
  async reactivateUser(userId: string): Promise<void> {
  const db = this.firebaseService.getFirestore();

  await db
    .collection('users')
    .doc(userId)
    .update({
      employmentStatus: EmploymentStatus.ACTIVE,
      updatedAt: FieldValue.serverTimestamp(),
    });
}
  async findByFirebaseUid(firebaseUid: string) {
  const db = this.firebaseService.getFirestore();

  const snapshot = await db
    .collection('users')
    .where('firebaseUid', '==', firebaseUid)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  return snapshot.docs[0].data();
}
  async findByEmployeeNumberExcludingUser(
  employeeNumber: string,
  userId: string,
) {
  const db = this.firebaseService.getFirestore();

  const snapshot = await db
    .collection('users')
    .where('employeeNumber', '==', employeeNumber)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const user = snapshot.docs[0].data();

  if (user.userId === userId) {
    return null;
  }

  return user;
}
}