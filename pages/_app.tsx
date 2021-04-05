import React, { useEffect } from 'react';
import { ApolloProvider } from "@apollo/client";
import '../styles/globals.css';
import '../styles/scss/main.scss';
import useApollo from '../lib/apolloClient';
import ThemeProvider from '../components/context/ThemeContext';
import { Router } from 'next/router';
import  ReactGA  from 'react-ga';

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);

    Router.events.on("routeChangeComplete", () => {
      setTimeout(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, 1000);
    });
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp