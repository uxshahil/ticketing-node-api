import { DataResponse } from './data-response.dto';
import { PaginationMetaResponse } from './pagination-meta-response.dto';

export class PaginatedDataResponse<T> extends DataResponse<T[]> {
  constructor(meta: PaginationMetaResponse, data: T[]) {
    super(meta, data);
  }
}
