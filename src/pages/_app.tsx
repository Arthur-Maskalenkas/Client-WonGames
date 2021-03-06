import NextNprogress from 'nextjs-progressbar';

import { CartProvider } from 'hooks/use-cart';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { Provider as AuthProvider } from 'next-auth/client';

import GlobalStyles from 'styles/global';

import { AppProps } from 'next/app';
import theme from 'styles/theme';

import Head from 'next/head';
import { useApollo } from 'utils/apollo';

function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <AuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CartProvider>
            <Head>
              <title>Won Games</title>
              <link rel="shortcut icon" href="/img/icon-512.png" />
              <link rel="apple-touch-icon" href="/img/icon-512.png" />
              <link rel="manifest" href="/manifest.json" />
              <meta name="description" content="The best Game Stores in the world!" />
            </Head>
            <GlobalStyles />
            <NextNprogress
              color="#F231A5"
              startPosition={0.3}
              stopDelayMs={200}
              height={8}
              showOnShallow={true}
            />
            <Component {...pageProps} />
          </CartProvider>
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}

export default App;
