import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { type ComponentProps } from "react";
import { Sizes } from "@/constants/Sizes";
import { Colors } from "@/constants/Colors";

interface props {
  title: string | null;
  inverted: boolean | null;
}

export function Button({
  title = "",
  inverted = false,
  onPress,
  style,
}: ComponentProps<typeof TouchableOpacity> & props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, styles[inverted ? "inverted" : "normal"]]}
    >
      <Text
        style={[styles.buttonText, styles[inverted ? "inverted" : "normal"]]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    fontFamily: "sans-serif",
  },

  button: {
    height: Sizes.buttonHeight,
    borderRadius: Sizes.buttonRadius,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    overflow: "visible",
    padding: 10,
  },

  normal: {
    backgroundColor: Colors.light.tint,
    color: "white",
  },

  inverted: {
    color: Colors.light.tint,
  },
});
