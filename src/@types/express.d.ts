declare namespace Express {
  export interface Request {
    user: {
      id_user: string;
      name: string;
      email: string;
    };
  }
}
