export const createUserValidatorSchema = {
  email: {
    required: true,
    min: 7,
    regex: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Enter a valid email.",
    },
  },
  name: { required: true, min: 7 },
};
