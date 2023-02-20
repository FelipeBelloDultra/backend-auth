export interface IValidationSchemaValues {
  required?: boolean | string;
  min?: number;
  max?: number;
  regex?: {
    value: RegExp;
    message: string;
  };
}

export interface ISchema {
  [key: string]: IValidationSchemaValues;
}
