import PaginationMetaResponse from './pagination-meta-response.dto';

export interface PagedList<T> {
  items: T[];
  paginationMetadata: PaginationMetaResponse;
}
