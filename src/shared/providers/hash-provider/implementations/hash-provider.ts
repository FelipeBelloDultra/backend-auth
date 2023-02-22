// Packages
import { compare, hash } from "bcrypt";

// Interfaces
import { IHashProvider } from "..";

export class HashProvider implements IHashProvider {
  public async encodePassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  public async compareHash(
    hashedPassword: string,
    password?: string
  ): Promise<boolean> {
    if (!password) {
      return false;
    }

    return compare(password, hashedPassword);
  }
}
