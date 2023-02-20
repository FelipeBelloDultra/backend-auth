export interface IHashProvider {
  encodePassword(password: string): Promise<string>;
  compareHash(hashedPassword: string, password: string): Promise<boolean>;
}
