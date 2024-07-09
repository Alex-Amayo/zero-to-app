import { BorderRadius, Colors, FontSizes, Name, Shadow } from "./brandTypes";

interface Brand {
  colors: Colors;
  fontSizes: FontSizes;
  borderRadius: BorderRadius;
  name: Name;
  shadow: Shadow;
}

const brand: Brand = {
  name: "Zero To App",
  borderRadius: 5,
  shadow: true,
  colors: {
    primary: "#1a4c9d",
    secondary: "#db4691",
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xlarge: 24,
  },
};

export default brand;
