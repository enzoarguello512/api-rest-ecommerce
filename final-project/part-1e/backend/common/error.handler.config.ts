import debug from 'debug';
import BaseError from './error/base.error';

const log: debug.IDebugger = debug('error-handler');

class ErrorHandler {
  handleError(err: Error): void {
    log(err);
  }

  isTrustedError(error: Error): boolean {
    return error instanceof BaseError && error.isOperational;
  }
}

export default new ErrorHandler();
