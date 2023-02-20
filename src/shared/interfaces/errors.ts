export interface IErrorsStack {
  [key: string]: {
    message: string;
  };
}

export interface IHttpError {
  message: string;
  statusCode?: number;
  errors: IErrorsStack;
}
