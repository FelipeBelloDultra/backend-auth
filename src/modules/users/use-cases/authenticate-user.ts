// Packages
import { injectable, inject } from "tsyringe";
import { sign } from "jsonwebtoken";

// Interfaces
import { IUserRepository } from "../repositories/user-repository";
import { IHashProvider } from "@/shared/providers/hash-provider";

// Errors
import { Either, left, right } from "@/shared/errors/either";
import { UnauthorizedSession } from "../errors/unauthorized-session";

// Config
import authConfig from "@/config/auth";

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

type Response = Either<UnauthorizedSession, string>;

@injectable()
export class AuthenticateUser {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,

    @inject("HashProvider")
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute(data: IAuthenticateUserRequest): Promise<Response> {
    let userWasFinded = true;

    const findedUserByEmail = await this.userRepository.findByEmail(data.email);

    if (!findedUserByEmail) {
      userWasFinded = false;
    }

    const passwordCombinationIsValid = await this.hashProvider.compareHash(
      findedUserByEmail ? findedUserByEmail.password : "",
      userWasFinded ? data.password : undefined
    );

    if (!passwordCombinationIsValid) {
      return left(new UnauthorizedSession());
    }

    const { secret, expiresIn } = authConfig;

    const token = sign(
      {
        name: findedUserByEmail?.name,
        email: findedUserByEmail?.email,
        username: findedUserByEmail?.username || null,
      },
      secret,
      {
        subject: findedUserByEmail?.id_user,
        expiresIn,
      }
    );

    return right(token);
  }
}
