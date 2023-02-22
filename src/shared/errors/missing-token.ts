// Errors
import { HttpError } from "./http-error";

export class MissingToken extends HttpError {
  constructor() {
    super({
      errors: {},
      statusCode: 401,
      message: "JWT token is missing.",
    });
  }
}
