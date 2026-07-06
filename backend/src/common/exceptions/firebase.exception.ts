import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class FirebaseEmailExistsException extends AppException {
  constructor() {
    super(
      'A user with this email address already exists.',
      'EMAIL_ALREADY_EXISTS',
      HttpStatus.CONFLICT,
    );
  }
}