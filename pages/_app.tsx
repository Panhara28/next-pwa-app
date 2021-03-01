import React from 'react';
import { ApolloProvider } from "@apollo/client";
import '../styles/globals.css';
import '../styles/scss/main.scss';
import useApollo from '../lib/apolloClient';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
