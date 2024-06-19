export default class MetaResponse {
  message?: string | object;

  constructor(message?: string) {
    this.message = message;
  }
}
