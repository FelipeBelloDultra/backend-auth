// Interfaces
import { ISchema } from "@/shared/interfaces/schemas";

export const createUserValidatorSchema: ISchema = {
  email: {
    required: true,
    max: 255,
    regex: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email.",
    },
  },
  name: {
    required: true,
    max: 255,
    regex: {
      value:
        /[a-zA-Zà-úÀ-Ú]([-']?[a-zA-Zà-úÀ-Ú]+)*( [a-zA-Zà-úÀ-Ú]([-']?[a-zA-Zà-úÀ-Ú]+)*)/g,
      message: "Enter a valid name.",
    },
  },
  password: {
    required: true,
    min: 6,
    max: 255,
  },
};
