import { extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
  green: {
    100: "#C6F6D5",
  },
  grey: {
    800: "#1A202C",
  },
};

const theme = extendTheme({
  colors,
});

export default theme;
