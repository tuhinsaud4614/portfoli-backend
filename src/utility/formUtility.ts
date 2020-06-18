import validator from "validator";

export interface FormValidator {
  required: boolean;
  maxLength?: number;
  minLength?: number;
  isUrl?: boolean;
}

export const checkValidation = (
  rules: FormValidator,
  value: string
): boolean => {
  let tempValid = true;
  if (rules.required) {
    tempValid = !validator.isEmpty(value.trim()) && tempValid;
  }

  if (rules.minLength) {
    tempValid =
      validator.isLength(value.trim(), {
        min: rules.minLength,
      }) && tempValid;
  }

  if (rules.maxLength) {
    tempValid =
      validator.isLength(value.trim(), {
        max: rules.maxLength,
      }) && tempValid;
  }

  if (rules.isUrl) {
    tempValid = validator.isURL(value.trim()) && tempValid;
  }

  return tempValid;
};
