// Errors
import { HttpError } from "@/shared/errors/http-error";

export class UserNotFound extends HttpError {
  constructor() {
    super({
      errors: {},
      statusCode: 404,
      message: "User not found.",
    });
  }
}
