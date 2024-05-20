import { Pressable, StyleSheet, Text } from "react-native";
import { colors, padding } from "../color";
const CustomButton = ({ baslik, fonksiyon }) => {
  const tiklamaFonksiyonu = () => {
    fonksiyon();
  };
  return (
    <Pressable onPress={() => tiklamaFonksiyonu()} style={styles.button}>
      <Text style={styles.btnText}>{baslik}</Text>
    </Pressable>
  );
};
export { CustomButton };
const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.primary,
    margin: padding.l,
  },
  btnText: {
    color: colors.textColor,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});