export class CreateUser {
  static async execute(value?: string): Promise<string> {
    if (!value) {
      return "Username is required";
    }

    return Promise.resolve(value);
  }
}
