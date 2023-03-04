import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { NavigationContextProvider } from "@/context/NavigationContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NavigationContextProvider>
      <ChakraProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ChakraProvider>
    </NavigationContextProvider>
  );
}
