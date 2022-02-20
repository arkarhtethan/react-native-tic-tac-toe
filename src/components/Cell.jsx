import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Cross from "./Cross";

const Cell = ({ onPress, cell }) => {
  return (
    <Pressable onPress={onPress} style={styles.cell}>
      {cell === "0" && <View style={styles.circle} />}
      {cell === "X" && <Cross />}
    </Pressable>
  );
};

export default Cell;

const styles = StyleSheet.create({
  cell: {
    flex: 1,
  },
  circle: {
    width: "70%",
    height: "70%",
    left: 0 * 130 + 10,

    top: 0 * 130 + 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 10,
    borderColor: "white",
  },
});
