import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/react-datepicker.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { StoreProvider } from "easy-peasy";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        <Component {...pageProps} />
        <div id="modal-root"></div>
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
