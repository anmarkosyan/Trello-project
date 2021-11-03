import Exception from './exceptions';
import statusCodes from './statusCodes';

class HttpError {
  notFound(message: string) {
    return new Exception(statusCodes.NotFound, message);
  }

  internalServerError(message: string) {
    return new Exception(statusCodes.InternalServerError, message);
  }

  badRequest(message: string) {
    return new Exception(statusCodes.BadRequest, message);
  }
}
export const HttpErr = new HttpError();
