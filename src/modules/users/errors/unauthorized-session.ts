// Errors
import { HttpError } from "@/shared/errors/http-error";

export class UnauthorizedSession extends HttpError {
  constructor() {
    super({
      errors: {},
      statusCode: 401,
      message: "Wrong email/password combination.",
    });
  }
}
