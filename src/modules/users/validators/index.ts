// Interfaces
import { ISchema } from "@/shared/interfaces/schemas";

// Validators
import { email, password } from "@/shared/validators";

export const createUserValidatorSchema: ISchema = {
  name: {
    required: true,
    max: 255,
    regex: {
      value:
        /[a-zA-Zà-úÀ-Ú]([-']?[a-zA-Zà-úÀ-Ú]+)*( [a-zA-Zà-úÀ-Ú]([-']?[a-zA-Zà-úÀ-Ú]+)*)/g,
      message: "Enter a valid name.",
    },
  },
  ...email,
  ...password,
};

export const authenticateUserValidatorSchema: ISchema = {
  ...email,
  ...password,
};

export const updateUserValidatorSchema: ISchema = {
  name: {
    required: true,
    max: 255,
    regex: {
      value:
        /[a-zA-Zà-úÀ-Ú]([-']?[a-zA-Zà-úÀ-Ú]+)*( [a-zA-Zà-úÀ-Ú]([-']?[a-zA-Zà-úÀ-Ú]+)*)/g,
      message: "Enter a valid name.",
    },
  },
  username: {
    required: true,
    max: 255,
    regex: {
      value: /^[a-zA-Z0-9_]+$/u,
      message: "Enter a valid username.",
    },
  },
  ...email,
  ...password,
};
