import Link from 'next/link';
import { signIn } from 'next-auth/client';

import {
  AccountCircle,
  Email,
  ErrorOutline,
  Lock,
} from '@styled-icons/material-outlined';

import { FormWrapper, FormLink, FormLoading, FormError } from 'components/Form';
import Button from 'components/Button';
import TextField from 'components/TextField';

import React, { useState } from 'react';

import { UsersPermissionsRegisterInput } from 'graphql/generated/globalTypes';
import { useMutation } from '@apollo/client';
import { MUTATION_REGISTER } from 'graphql/mutations/register';
import { FieldErrors, signUpValidate } from 'utils/validations';

// > Usuario muda o formulario, e cada letra ativa o handleInput, que atualiza o objeto pegando o valor atual (...s) e adicionando o campo novo
// > Assim que o botão de submit é clicado, o handleSubmit é ativado

const FormSignUp = () => {
  // Pegando o tipo que é necessario para criar usuario
  const [values, setValues] = useState<UsersPermissionsRegisterInput>({
    username: '',
    email: '',
    password: '',
  });
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [fieldError, setFieldError] = useState<FieldErrors>({});

  // https://www.apollographql.com/docs/react/data/mutations/
  const [createUser, { loading, error }] = useMutation(MUTATION_REGISTER, {
    onError: (err) =>
      setFormError(err.graphQLErrors[0]?.extensions?.data.message[0].messages[0].message), //PEgando o erro formatado do graphql
    onCompleted: () => {
      !error &&
        signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/',
        });
    },
  });

  // {..., username: 'novo valor'}
  const handleInput = (field: string, value: string) => {
    setValues((stateInput) => ({ ...stateInput, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Previne a atualização da pagina
    setLoadingSubmit(true);

    // PEgando os erros em tempo real do form
    const errors = signUpValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoadingSubmit(false);
      return;
    }

    setFieldError({});

    // MUTATION_REGISTER recebe input como argumento mutation MutationRegister($input: UsersPermissionsRegisterInput!) {
    await createUser({
      variables: {
        input: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      },
    });

    setLoadingSubmit(false);
  };

  return (
    <FormWrapper>
      {!!formError && (
        <FormError>
          <ErrorOutline /> {formError}
        </FormError>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          placeholder="Username"
          type="text"
          error={fieldError?.username}
          icon={<AccountCircle />}
          onInputChange={(value) => handleInput('username', value)}
        />
        <TextField
          name="email"
          placeholder="Email"
          error={fieldError?.email}
          type="email"
          icon={<Email />}
          onInputChange={(value) => handleInput('email', value)}
        />
        <TextField
          name="password"
          placeholder="Password"
          error={fieldError?.password}
          type="password"
          icon={<Lock />}
          onInputChange={(value) => handleInput('password', value)}
        />
        <TextField
          name="confirm_password"
          placeholder="Confirm password"
          error={fieldError?.confirm_password}
          type="password"
          icon={<Lock />}
          onInputChange={(value) => handleInput('confirm_password', value)}
        />

        <Button type="submit" size="large" fullWidth disabled={loadingSubmit}>
          {loadingSubmit ? <FormLoading /> : <span>Sign up now</span>}
        </Button>

        <FormLink>
          Already have an account?{' '}
          <Link href="/sign-in">
            <a>Sign in</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  );
};

export default FormSignUp;
