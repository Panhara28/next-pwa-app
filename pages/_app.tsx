import React, { useEffect } from 'react';
import { ApolloProvider } from "@apollo/client";
import '../styles/globals.css';
import '../styles/scss/main.scss';
import useApollo from '../lib/apolloClient';
import ThemeProvider from '../components/context/ThemeContext';

const ThemePrefer = () => {
  useEffect(() => {
    function getInitialColorMode() {
      const persistedColorPreference = window.localStorage.getItem('color-mode');
      const hasPersistedPreference = typeof persistedColorPreference === 'string';
      // If the user has explicitly chosen light or dark,
      // let's use it. Otherwise, this value will be null.
      if (hasPersistedPreference) {
        return persistedColorPreference;
      }
      // If they haven't been explicit, let's check the media
      // query
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const hasMediaQueryPreference = typeof mql.matches === 'boolean';
      if (hasMediaQueryPreference) {
        return mql.matches ? 'dark' : 'light';
      }
      
      // If they are using a browser/OS that doesn't support
      // color themes, let's default to 'light'.
      return 'light';
    }

    function setCSSVar(property, color) {
      document.documentElement.style.setProperty(property, color);
    }

    const colorMode = getInitialColorMode();
    let theme = {};
    
    if(colorMode === "dark") {
      theme = {
        '--color-text-primary': '#FDFEFE',
        '--color-text-secondary': '#d0d3d4',
        '--bg-color-navbar': '#000000',
        '--bg-color-navbar-category': '#292929',
        '--bg-color-container': '#393939'
      };
    }
  
    for(let key in theme) {
      setCSSVar(key, theme[key]);
    }
  }, []);

  return null;
}

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemePrefer/>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp
