import MetaResponse from './meta-response.dto';

export default class DataResponse<T> {
  meta: MetaResponse;

  data: T;

  constructor(meta: MetaResponse, data: T) {
    this.meta = meta;
    this.data = data;
  }
}
