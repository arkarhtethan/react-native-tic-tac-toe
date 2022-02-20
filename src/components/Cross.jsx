import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Cross = () => {
  return (
    <View style={styles.cross}>
      <View style={styles.crossLine}></View>
      <View style={[styles.crossLine, styles.crossLineReversed]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  crossLine: {
    position: "absolute",
    left: "70%",
    top: "20%",
    backgroundColor: "white",
    width: 10,
    height: "100%",
    transform: [{ rotate: "45deg" }],
  },
  crossLineReversed: {
    transform: [{ rotate: "-45deg" }],
  },
  cross: {
    width: "70%",
    height: "70%",
  },
});

export default Cross;
