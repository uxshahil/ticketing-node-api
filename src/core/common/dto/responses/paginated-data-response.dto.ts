import DataResponse from './data-response.dto';

export default class PaginatedDataResponse<T> extends DataResponse<T[]> {}
