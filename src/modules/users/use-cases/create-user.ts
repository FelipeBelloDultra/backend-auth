export class CreateUser {
  public async execute(value: string): Promise<string> {
    if (!value) {
      throw new Error("Username is required");
    }

    return Promise.resolve(value);
  }
}
