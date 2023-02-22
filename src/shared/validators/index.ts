// Interfaces
import { ISchema } from "../interfaces/schemas";

export const email: ISchema = {
  email: {
    required: true,
    max: 255,
    regex: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email.",
    },
  },
};

export const password: ISchema = {
  password: {
    required: true,
    min: 6,
    max: 255,
  },
};
