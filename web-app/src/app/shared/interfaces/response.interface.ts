export interface Response<T> {
  message?: string;
  payload?: T
}

export interface PaginatedResponse<T> {
  message: string;
  payload: {
    data: T[],
    total: number;
  }
}