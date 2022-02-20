import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Alert,
  Pressable,
  Text,
} from "react-native";
import bg from "./assets/images/bg.jpeg";
import Cell from "./src/components/Cell";
import Cross from "./src/components/Cross";
const emptyMap = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
export default function App() {
  const [map, setMap] = useState(emptyMap);
  const [currentTurn, setCurrentTurn] = useState("X");
  const onPress = (rowIndex, colIndex) => {
    if (map[rowIndex][colIndex] !== "") {
      Alert.alert("Position already occupied.");
      return;
    }
    setMap((existingMap) => {
      const updatedArray = [...existingMap];
      updatedArray[rowIndex][colIndex] = currentTurn;
      return updatedArray;
    });
    setCurrentTurn(currentTurn === "X" ? "0" : "X");
    const winner = checkWinningState();
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
  };
  const checkWinningState = () => {
    // check row
    for (let i = 0; i < 3; i++) {
      const isRowXWinning = map[i].every((cell) => cell === "X");
      if (isRowXWinning) {
        return "X";
      }
      const isRow0Winning = map[i].every((cell) => cell === "0");
      if (isRow0Winning) {
        return "0";
      }
    }
    // check column
    for (let col = 0; col < 3; col++) {
      let isColXWinning = true;
      let isCol0Winning = true;
      for (let row = 0; row < 3; row++) {
        if (map[row][col] !== "X") {
          isColXWinning = false;
        }
        if (map[row][col] !== "0") {
          isCol0Winning = false;
        }
      }
      if (isColXWinning) {
        return "X";
      }
      if (isCol0Winning) {
        return "0";
      }
    }
    // check diagonal
    let isDiagonal10Winning = true;
    let isDiagonal1XWinning = true;
    let isDiagonal20Winning = true;
    let isDiagonal2XWinning = true;
    for (let i = 0; i < 3; i++) {
      if (map[i][i] !== "0") {
        isDiagonal10Winning = false;
      }
      if (map[i][i] !== "X") {
        isDiagonal1XWinning = false;
      }
      if (map[i][2 - i] !== "0") {
        isDiagonal20Winning = false;
      }
      if (map[i][2 - i] !== "X") {
        isDiagonal2XWinning = false;
      }
    }
    if (isDiagonal10Winning) {
      return "0";
    }
    if (isDiagonal1XWinning) {
      return "X";
    }
    if (isDiagonal20Winning) {
      return "0";
    }
    if (isDiagonal2XWinning) {
      return "X";
    }
  };

  const checkTieState = () => {
    if (!map.some((row) => row.some((col) => col === ""))) {
      return Alert.alert("It's a tie", `Tie`, [
        { text: "Restart", onPress: resetGame },
      ]);
    }
  };

  const gameWon = (player) => {
    Alert.alert("Huraay", `Player ${player} won.`, [
      { text: "Restart", onPress: resetGame },
    ]);
  };
  const resetGame = () => {
    setMap([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setCurrentTurn("X");
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="contain" style={styles.bg}>
        <Text
          style={{
            fontSize: 24,
            color: "white",
            marginBottom: "auto",
            marginTop: 50,
            position: "absolute",
            top: 50,
          }}
        >
          Current Turn: {currentTurn}
        </Text>
        <View style={styles.map}>
          {map.map((row, rowIndex) => {
            return (
              <View key={`row-${rowIndex}`} style={styles.row}>
                {row.map((cell, colIndex) => (
                  <Cell
                    cell={cell}
                    key={`${colIndex}-${rowIndex}`}
                    onPress={() => onPress(rowIndex, colIndex)}
                  />
                ))}
              </View>
            );
          })}
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242D34",
    alignItems: "center",
    justifyContent: "center",
  },
  bg: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  map: {
    width: "88%",
    aspectRatio: 1,
  },
});
