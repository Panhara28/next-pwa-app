import React from 'react';
import { ApolloProvider } from "@apollo/client";
import '../styles/globals.css';
import '../styles/scss/main.scss';
import useApollo from '../lib/apolloClient';
import ThemeProvider from '../components/context/ThemeContext';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp
