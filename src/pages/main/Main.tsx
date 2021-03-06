import React from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { Colors } from "../../style";
import { Back, Button, Done, Grid, Refresh, Remove } from "../components";
import { Solver } from "./Solver";

class Main extends React.Component {
  numMatrix = Array(9).fill(Array(9).fill(0));

  state = {
    objMatrix: this.numMatrix.map((row) => {
      return row.map((val: any) => {
        return { value: val, color: Colors.TEXT_PRIMARY };
      });
    }),
    activeCell: { x: 0, y: 0 },
  };

  onActiveCellChange = (y: number, x: number) => {
    this.setState({
      activeCell: { x: x, y: y },
    });
  };

  onExit = () => {
    BackHandler.exitApp();
  };

  clearAllCells = () => {
    Array(9)
      .fill(Array(9).fill(0))
      .forEach((row: any, y: number) => {
        return row.forEach((num: any, x: number) => {
          return this.changeNum(y, x, num);
        });
      });
  };

  cleanCell = () => {
    const { activeCell } = this.state;
    const { x, y } = activeCell;

    this.changeNum(y, x, 0);
  };

  onNumChange = (newValue: number) => {
    const { activeCell } = this.state;
    const { x, y } = activeCell;

    this.changeNum(y, x, newValue);
  };

  changeNum = (y: number, x: number, value: number) => {
    const { objMatrix } = this.state;
    let newMatrix = objMatrix;

    newMatrix[y][x].value = value;
    newMatrix[y][x].color = Colors.TEXT_PRIMARY;
    this.setState({
      objMatrix: newMatrix,
    });
  };

  solveProblem = () => {
    const solver = new Solver(this.state.objMatrix);
    const newObjMatrix = solver.run();
    this.setState({
      objMatrix: newObjMatrix,
    });
  };

  render() {
    const { objMatrix, activeCell } = this.state;
    const numBoard = [
      [
        { value: 1, color: Colors.TEXT_PRIMARY },
        { value: 2, color: Colors.TEXT_PRIMARY },
        { value: 3, color: Colors.TEXT_PRIMARY },
      ],
      [
        { value: 4, color: Colors.TEXT_PRIMARY },
        { value: 5, color: Colors.TEXT_PRIMARY },
        { value: 6, color: Colors.TEXT_PRIMARY },
      ],
      [
        { value: 7, color: Colors.TEXT_PRIMARY },
        { value: 8, color: Colors.TEXT_PRIMARY },
        { value: 9, color: Colors.TEXT_PRIMARY },
      ],
    ];

    return (
      <View style={styles.main}>
        <View style={styles.topBar}>
          <Button
            icon={<Back width={40} height={40} />}
            onPress={this.onExit}
          />
          <Button
            icon={<Refresh width={40} height={40} />}
            onPress={this.clearAllCells}
          />
          <Button
            icon={<Done width={40} height={40} />}
            onPress={this.solveProblem}
          />
        </View>
        <View style={styles.board}>
          <Grid
            matrix={objMatrix}
            activeCell={activeCell}
            onCellClick={this.onActiveCellChange}
            style={styles.grid}
          />
        </View>
        <View style={styles.numBoard}>
          <View style={styles.numBoardLine}>
            {Array(5)
              .fill(1)
              .map((_val, index) => {
                const number = index + 1;
                const onPress = () => this.onNumChange(number);

                return (
                  <Button
                    key={number}
                    text={number.toString()}
                    onPress={onPress}
                  />
                );
              })}
          </View>
          <View style={styles.numBoardLine}>
            {Array(5)
              .fill(1)
              .map((_val, index) => {
                const number = index + 6;
                const outOfScope = number >= 10;
                const buttonText = !!outOfScope ? "" : number.toString();
                const buttonIcon = !!outOfScope ? (
                  <Remove width={40} height={40} />
                ) : undefined;
                const onPress = !outOfScope
                  ? () => this.onNumChange(number)
                  : this.cleanCell;

                return (
                  <Button
                    key={number}
                    icon={buttonIcon}
                    text={buttonText}
                    onPress={onPress}
                  />
                );
              })}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: Colors.APP_PRIMARY,
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    margin: 25,
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  board: {
    flexDirection: "row",
  },
  numBoard: {
    flexDirection: "column",
    marginVertical: 15,
    marginHorizontal: 25,
    alignSelf: "stretch",
  },
  numBoardLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  grid: {
    marginHorizontal: 25,
  },
});

export { Main };
