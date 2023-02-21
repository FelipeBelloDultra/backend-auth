// Interfaces
import { INextFunction, IRequest, IResponse } from "@/shared/interfaces/http";
import { IErrorsStack } from "@/shared/interfaces/errors";
import { ISchema } from "@/shared/interfaces/schemas";

// Controllers
import { BaseController } from "../controllers/base-controller";

export class ValidateRequest {
  public validate(schema: ISchema) {
    return (req: IRequest, res: IResponse, next: INextFunction) => {
      const { body } = req;

      const errors: IErrorsStack = {};

      Object.keys(schema).forEach((schemaKey) => {
        const schemaItem = schema[schemaKey];
        const bodyValue = body[schemaKey];

        const bodyValueLength = bodyValue ? bodyValue.length : 0;

        if (
          schemaItem.required &&
          (!bodyValue || !bodyValueLength || !bodyValue.trim())
        ) {
          errors[schemaKey] = [
            ...(errors[schemaKey] || []),
            `${schemaKey} is required.`,
          ];
        }

        if (schemaItem.min && bodyValueLength < schemaItem.min) {
          errors[schemaKey] = [
            ...(errors[schemaKey] || []),
            `${schemaKey} must be less than ${schemaItem.min} characters.`,
          ];
        }

        if (schemaItem.max && bodyValueLength > schemaItem.max) {
          errors[schemaKey] = [
            ...(errors[schemaKey] || []),
            `${schemaKey} must be more than ${schemaItem.max} characters.`,
          ];
        }

        if (
          schemaItem.regex &&
          !new RegExp(schemaItem.regex.value).test(bodyValue)
        ) {
          errors[schemaKey] = [
            ...(errors[schemaKey] || []),
            schemaItem.regex.message,
          ];
        }
      });

      if (Object.keys(errors).length > 0) {
        return BaseController.responseWithError(res, {
          errors,
          message: "Check the fields.",
          statusCode: 422,
        });
      }

      return BaseController.responseNext(next);
    };
  }
}
