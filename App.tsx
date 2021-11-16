import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Main } from "./src/pages/main/Main";

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <Main />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
