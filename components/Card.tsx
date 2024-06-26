import { View, StyleSheet } from "react-native";
import brand from "../brand/brandConfig";

type CardProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const Card = ({ children }: CardProps) => {
  return <View style={styles.container}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    minWidth: 350,
    backgroundColor: brand.card.cardBackground,
    borderRadius: brand.card.borderRadius,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: brand.card.shadow ? "#171717" : undefined,
    shadowOffset: brand.card.shadow ? { width: -2, height: 2 } : undefined,
    shadowOpacity: brand.card.shadow ? 0.15 : undefined,
    shadowRadius: brand.card.shadow ? 3 : undefined,
    elevation: brand.card.shadow ? 20 : undefined,
  },
});
