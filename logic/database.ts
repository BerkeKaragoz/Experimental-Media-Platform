import { caesarCipher, caesarDecipher } from "./utils/caesarCipher";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const SHIFT_AMOUNT = parseInt(
  process.env.SHIFT_AMOUNT ? process.env.SHIFT_AMOUNT : "1",
  10,
);

export const encrypt = (string: string): string =>
  caesarCipher(string, SHIFT_AMOUNT);

export const decrypt = (string: string): string =>
  caesarDecipher(string, SHIFT_AMOUNT);

const httpLink = createHttpLink({
  uri: "https://graphql.fauna.com/graphql",
  headers: {
    authorization: `Bearer ${process.env.FAUNA_API_KEY}`,
  },
});

const ApolloClientInstance = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default ApolloClientInstance;
