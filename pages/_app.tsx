import React, { useEffect, useState } from 'react';
import { ApolloProvider } from "@apollo/client";
import useApollo from '../lib/apolloClient';
import ThemeProvider from '../components/context/ThemeContext';
import { useRouter } from 'next/router';
import  ReactGA  from 'react-ga';
import Loading from '../components/utilities/Loading';
import '../styles/scss/main.scss';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const router = useRouter();
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
    ReactGA.pageview(window.location.pathname + window.location.search);

    const routeChangeStart = () => setLoading(true);

    const routeChangeComplete = () => {
      setLoading(false);

      setTimeout(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
      }, 1000);
    }

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeStart", routeChangeStart);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <Head>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>
        </Head>
        <Component {...pageProps} />
        <Loading loading={loading}/>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp