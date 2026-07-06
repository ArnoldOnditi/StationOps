import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    message: string,
    errorCode: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        success: false,
        message,
        errorCode,
      },
      status,
    );
  }
}