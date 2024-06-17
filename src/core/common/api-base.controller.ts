/* eslint-disable class-methods-use-this */
import { DataResponse } from '@core/common/dto/responses/data-response.dto';
import { MetaResponse } from '@core/common/dto/responses/meta-response.dto';
import { PagedList } from '@core/common/dto/responses/paged-list.dto';
import { PaginatedDataResponse } from '@core/common/dto/responses/paginated-data-response.dto';
import { PaginationMetaResponse } from '@core/common/dto/responses/pagination-meta-response.dto';
import { Response } from 'express';

abstract class ApiBaseController {
  protected error(res: Response, message?: string) {
    const meta = new MetaResponse(
      500, // Assuming 500 for internal server error
      message || 'An error occurred',
    );
    res.status(500).json(new DataResponse(meta, null));
  }

  protected ok(res: Response, message?: string) {
    const meta = new MetaResponse(200, message); // Assuming 200 for OK
    res.status(200).json(new DataResponse(meta, []));
  }

  protected okWithData<T>(res: Response, data: T, message?: string) {
    const meta = new MetaResponse(200, message); // Assuming 200 for OK
    res.status(200).json(new DataResponse(meta, data));
  }

  protected okWithPagination<T>(
    res: Response,
    paginatedData: PagedList<T>,
    message?: string,
  ) {
    const meta = new PaginationMetaResponse(
      200, // Assuming 200 for OK
      message,
      paginatedData.paginationMetadata,
    );
    res.status(200).json(new PaginatedDataResponse(meta, paginatedData.items));
  }

  protected created<T>(res: Response, data: T, message?: string) {
    const meta = new MetaResponse(201, message); // Assuming 201 for Created
    res.status(201).json(new DataResponse(meta, data));
  }

  protected noContent(res: Response) {
    res.status(204).send({ message: 'No Content' }); // Assuming 204 for No Content
  }
}

export default ApiBaseController;
