// Errors
import { HttpError } from "./http-error";

export class InvalidToken extends HttpError {
  constructor() {
    super({
      errors: {},
      statusCode: 401,
      message: "Invalid JWT token.",
    });
  }
}
