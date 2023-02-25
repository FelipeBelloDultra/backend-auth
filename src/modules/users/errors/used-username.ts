// Errors
import { HttpError } from "@/shared/errors/http-error";

export class UsedUsername extends HttpError {
  constructor() {
    super({
      errors: {
        username: ["Choose another username, this one is already in use."],
      },
      statusCode: 422,
      message: "Username already exists.",
    });
  }
}
