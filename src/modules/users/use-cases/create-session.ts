// Packages
import { injectable, inject } from "tsyringe";

// Interfaces
import { IUserRepository } from "../repositories/user-repository";
import { IHashProvider } from "@/shared/providers/hash-provider";

// Errors
import { Either, left, right } from "@/shared/errors/either";
import { UnauthorizedSession } from "../errors/unauthorized-session";

interface ICreateSessionRequest {
  email: string;
  password: string;
}

type Response = Either<UnauthorizedSession, string>;

@injectable()
export class CreateSession {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository,

    @inject("HashProvider")
    private readonly hashProvider: IHashProvider
  ) {}

  public async execute(data: ICreateSessionRequest): Promise<Response> {
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

    return right("HELLO");
  }
}
