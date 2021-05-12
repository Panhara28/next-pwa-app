import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { sha256 } from 'crypto-hash';

console.log(`Pointing end point: ${process.env.NEXT_PUBLIC_API_URI}`);
let apolloClient: ApolloClient<NormalizedCacheObject>;
const secureRequest = process.browser ? (window.location.protocol === "https:" || window.location.hostname === "localhost" ? true : false) : true;
const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_API_URI });
// Using this to save network bandwidth
// Ref: https://www.apollographql.com/docs/react/api/link/persisted-queries/
const httpsLink = createPersistedQueryLink({ sha256 }).concat(httpLink);

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: !process.browser, // Set to true for SSR
    link: secureRequest ? httpsLink : httpLink,// Using normal http link for unsecure request
    cache: new InMemoryCache(),
    name: process.env.APOLLO_CLIENT_NAME
  });
}

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (!process.browser) return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

export default useApollo;