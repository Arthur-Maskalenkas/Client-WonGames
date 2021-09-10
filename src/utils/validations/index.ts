import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes';
import Joi from 'joi';

type SignInValues = Omit<UsersPermissionsRegisterInput, 'username'>;

// tlds permite @
const fieldsValidations = {
  username: Joi.string().min(5).required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  password: Joi.string().required(),

  // 'any.only' é para qualquer erro nesse campo (execto vazio), passe essa mensagem
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({ 'any.only': 'confirm password does not match with password' }),
};

// Para tratar os erros, vai pegar o textinho do erro atraves do error.details
export type FieldErrors = {
  [key: string]: string;
};

function getFieldErrors(objError: Joi.ValidationResult) {
  const error: FieldErrors = {};
  if (objError.error) {
    objError.error.details.forEach((err) => {
      error[err.path.join('.')] = err.message;
    });
  }

  return error;
}

export function signUpValidate(values: UsersPermissionsRegisterInput) {
  const { confirm_password, email, password, username } = fieldsValidations;

  const schema = Joi.object({ confirm_password, email, password, username });

  return getFieldErrors(schema.validate(values, { abortEarly: false }));
}

export function signInValidate(values: SignInValues) {
  const { email, password } = fieldsValidations;
  const schema = Joi.object({ email, password });

  // Abort serve para indicar todos os erros de uma vez, ao invés de um por um
  return getFieldErrors(schema.validate(values, { abortEarly: false }));
}
