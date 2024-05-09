import { CustomError } from './custom-error.error';

export class UnauthenticatedError extends CustomError {
  constructor(message: string = 'Unauthenticated') {
    super(message);
  }
}
