interface ICreateSessionRequest {
  email: string;
  password: string;
}

export class CreateSession {
  public async execute(data: ICreateSessionRequest): Promise<string> {
    if (data.email === "test@test.com" || data.password === "123123123") {
      return "success";
    }

    return "fail";
  }
}
