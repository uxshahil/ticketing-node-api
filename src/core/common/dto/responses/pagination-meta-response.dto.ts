import { MetaResponse } from './meta-response.dto';

export class PaginationMetaResponse extends MetaResponse {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;

  constructor(
    statusCode: number,
    message: string | undefined,
    paginationMetadata: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    },
  ) {
    super(statusCode, message);
    this.currentPage = paginationMetadata.currentPage;
    this.pageSize = paginationMetadata.pageSize;
    this.totalItems = paginationMetadata.totalItems;
    this.totalPages = paginationMetadata.totalPages;
  }
}
