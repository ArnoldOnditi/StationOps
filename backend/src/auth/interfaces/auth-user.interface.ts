export interface AuthUser {
  firebaseUid: string;

  userId: string;

  fullName: string;

  roleId: string;

  stationId: string;

  email: string;
}
export interface AuthenticatedUser {
  userId: string;
  firebaseUid: string;
  employeeNumber: string;
  fullName: string;
  email: string;
  roleId: string;
  stationId: string;
}