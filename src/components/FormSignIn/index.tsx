import { signIn } from 'next-auth/client';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useState } from 'react';

import { Email, Lock } from '@styled-icons/material-outlined';

import { FormLink, FormLoading, FormWrapper } from 'components/Form';
import Button from 'components/Button';
import TextField from 'components/TextField';

import { FieldErrors, signInValidate } from 'utils/validations';

import * as S from './styles';

type UserSigninInput = {
  email: string;
  password: string;
};

const FormSignIn = () => {
  // Pegando o tipo que é necessario para entrar um usuario
  const [values, setValues] = useState<UserSigninInput>({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [fieldError, setFieldError] = useState<FieldErrors>({});
  const { push } = useRouter();

  // {..., username: 'novo valor'}
  const handleInput = (field: string, value: string) => {
    setValues((stateInput) => ({ ...stateInput, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Previne a atualização da pagina
    setLoading(true);

    // PEgando os erros em tempo real do form
    const errors = signInValidate(values);

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      return;
    }

    setFieldError({});

    // Esperando o resultado da promise
    const result = await signIn('credentials', {
      redirect: false,
      callbackUrl: '/',
      password: values.password,
      email: values.email,
    });

    /*
    o signIn retorna uma promise. Um objeto com as seguintes caracteristicas, ja resolvidas:
    
    * error: string | undefined
    * status: number
    * ok: boolean
    * url: string | null
    */

    if (result?.url) {
      return push(result?.url);
    }

    setLoading(false);
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
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
          type="password"
          error={fieldError?.password}
          icon={<Lock />}
          onInputChange={(value) => handleInput('password', value)}
        />
        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

        <Button type="submit" size="large" fullWidth disabled={loading}>
          {loading ? <FormLoading /> : <span>Sign in now</span>}
        </Button>

        <FormLink>
          Don’t have an account?{' '}
          <Link href="/sign-up">
            <a>Sign up</a>
          </Link>
        </FormLink>
      </form>
    </FormWrapper>
  );
};

export default FormSignIn;
