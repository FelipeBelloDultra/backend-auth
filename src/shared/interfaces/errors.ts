export interface IErrorsStack {
  [key: string]: string[];
}

export interface IHttpError {
  message: string;
  statusCode?: number;
  errors: IErrorsStack;
}
