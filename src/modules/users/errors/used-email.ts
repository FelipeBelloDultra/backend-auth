// Errors
import { HttpError } from "@/shared/errors/http-error";

export class UsedEmail extends HttpError {
  constructor() {
    super({
      errors: {
        email: { message: "Choose another email, this one is already in use." },
      },
      statusCode: 422,
      message: "Email already exists.",
    });
  }
}
