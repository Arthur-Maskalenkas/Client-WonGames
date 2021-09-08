// https://strapi.io/documentation/developer-docs/latest/development/plugins/users-permissions.html#registration

import NextAuth, { User } from 'next-auth';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import Providers from 'next-auth/providers';
import { NextApiRequest, NextApiResponse } from 'next-auth/internals/utils';

type AuthorizeProps = {
  email: string;
  password: string;
};

// Eu estou criando as opções que vão ser enviadas para o nextauth
// Logo dentro tem os providers que tem a função de autenticar o usuario e retornar o token do usuario
// NO caso eu estou trabalhando com um backend proprio, por isso estou usando .crendetials, mas poderia ser google e etc... caso fosse outro back-end
// Dentro das credencials do NEXTAUTH eu to rodando um authorize passando o email e a senha, e um fetch dentro
// logo depois eu faço um fetch no STRAPI(com a rota da documentação) passando o email e a senha que é esperado como email e password
// Logo depois eu pego o dado, transformo em json e verifico. Caso ele passe, logo depois vai para as callbacks

const options = {
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    Providers.Credentials({
      name: 'Sign-in',
      credentials: {},
      async authorize({ email, password }: AuthorizeProps) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
          method: 'POST',
          body: new URLSearchParams({ identifier: email, password }),
        });

        const data = await response.json();

        if (data.user) {
          return { ...data.user, jwt: data.jwt };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async (session: Session, user: User) => {
      session.jwt = user.jwt;
      session.id = user.id;

      return Promise.resolve(session);
    },
    jwt: async (token: JWT, user: User) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.username as string;
        token.jwt = user.jwt;
      }

      return Promise.resolve(token);
    },
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);

export default Auth;
