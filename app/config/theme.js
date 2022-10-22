import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#fc5c65",
  black: "#171717",
  white: "#ffffff",
  background: "#ffffff",
};

export const SIZES = {
  base: 10,
  width,
  height,
};

const theme = { COLORS, SIZES };

export default theme;
