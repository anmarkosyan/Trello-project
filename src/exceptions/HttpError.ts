import Exception from './exceptions';

class HttpError {
  notFound(message: string) {
    return new Exception(400, message);
  }

  internalServerError(message: string) {
    return new Exception(500, message);
  }
}
export const HttpErr = new HttpError();
