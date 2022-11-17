import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// define tokens
const tokens = {
  colors: {
    light: {
      "bg-default": "white",
      "bg-btn": "yellow",
    },
    dark: {
      "bg-default": "black",
      "bg-btn": "magenta",
    },
  },
};

// define semantic token
const semanticTokens = {
  colors: {
    "bg-default": {
      default: tokens.colors.dark["bg-default"],
      _light: tokens.colors.light["bg-default"],
    },
    "bg-btn": {
      default: tokens.colors.dark["bg-btn"],
      _light: tokens.colors.light["bg-btn"],
    },
  },
};

//
const styles = {
  global: {
    body: {
      background: "bg-default",
    },
  },
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: "0",
      color: "aw-default",
      _focus: {
        ring: "0px",
      },
    },
    variants: {
      solid: {
        backgroundColor: "bg-btn",
      },
    },
  },
};

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
});

export default theme;
