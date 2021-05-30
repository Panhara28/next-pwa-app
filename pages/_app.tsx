import React, { useEffect, useState } from 'react';
import { ApolloProvider } from "@apollo/client";
import useApollo from '../lib/apolloClient';
import ThemeProvider from '../components/context/ThemeContext';
import { useRouter } from 'next/router';
import  ReactGA  from 'react-ga';
import Head from 'next/head';
import NProgress from 'nprogress';
import '../styles/scss/main.scss';

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();

  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);
    NProgress.configure({ showSpinner: false });

    const routeChangeStart = () => NProgress.start();
    const routeChangeError = () => NProgress.done();
    const routeChangeComplete = () => {
      NProgress.done();

      setTimeout(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, 1000);
    }

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeError", routeChangeError);
    router.events.on("routeChangeComplete", routeChangeComplete);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeError", routeChangeError);
      router.events.off("routeChangeComplete", routeChangeComplete);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <Head>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>
        </Head>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp