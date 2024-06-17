export class MetaResponse {
  statusCode: number;
  message?: string | object;

  constructor(statusCode: number, message?: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
