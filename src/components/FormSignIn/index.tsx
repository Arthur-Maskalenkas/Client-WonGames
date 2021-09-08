import { signIn } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Email, Lock } from '@styled-icons/material-outlined';

import { FormLink, FormWrapper } from 'components/Form';
import Button from 'components/Button';
import TextField from 'components/TextField';

import * as S from './styles';

type UserSigninInput = {
  email: string;
  password: string;
};

const FormSignIn = () => {
  // Pegando o tipo que é necessario para entrar um usuario
  const [values, setValues] = useState<UserSigninInput>({ email: '', password: '' });

  const { push } = useRouter();

  // {..., username: 'novo valor'}
  const handleInput = (field: string, value: string) => {
    setValues((stateInput) => ({ ...stateInput, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Previne a atualização da pagina

    // Esperando o resultado da promise
    const result = await signIn('credentials', {
      redirect: false,
      callbackUrl: '/',
      password: values.password,
      email: values.email,
    });

    /*
    o signIn retorna uma promise
    
    * error: string | undefined
    * status: number
    * ok: boolean
    * url: string | null
    */

    if (result?.url) {
      return push(result?.url);
    }

    console.log('email ou senha invalidos');
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          type="email"
          icon={<Email />}
          onInputChange={(value) => handleInput('email', value)}
        />
        <TextField
          name="password"
          placeholder="Password"
          type="password"
          icon={<Lock />}
          onInputChange={(value) => handleInput('password', value)}
        />
        <S.ForgotPassword href="#">Forgot your password?</S.ForgotPassword>

        <Button type="submit" size="large" fullWidth>
          Sign in now
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
