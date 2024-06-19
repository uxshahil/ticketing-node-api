import MetaResponse from './meta-response.dto';

export default class PaginationMetaResponse extends MetaResponse {
  currentPage: number;

  pageSize: number;

  totalItems: number;

  totalPages: number;

  constructor(
    message: string | undefined,
    paginationMetadata: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
    },
  ) {
    super(message);
    this.currentPage = paginationMetadata.currentPage;
    this.pageSize = paginationMetadata.pageSize;
    this.totalItems = paginationMetadata.totalItems;
    this.totalPages = paginationMetadata.totalPages;
  }
}
