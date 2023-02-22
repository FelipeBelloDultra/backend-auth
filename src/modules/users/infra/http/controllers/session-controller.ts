// Packages
import { container } from "tsyringe";

// Interfaces
import { IRequest, IResponse } from "@/shared/interfaces/http";

// Controllers
import { BaseController } from "@/shared/infra/http/controllers/base-controller";

// Use Cases
import { CreateSession } from "@/modules/users/use-cases/create-session";

export class SessionController {
  public async create(req: IRequest, res: IResponse): Promise<IResponse> {
    const { email, password } = req.body;

    const createSession = container.resolve(CreateSession);

    const result = await createSession.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      return BaseController.responseWithError(res, {
        errors: result.value.errors,
        message: result.value.message,
        statusCode: result.value.statusCode,
      });
    }

    return BaseController.responseWithJSON(res, {
      data: result,
      statusCode: 200,
    });
  }
}
