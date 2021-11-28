import React from "react";
import { StyleSheet, View } from "react-native";
import { Grid } from "./components/Grid";
import { Solver } from "./Solver";

const BACKGROUND_COLOR = "#3b57b3";
const TEXT_PRIMARY_COLOR = "#2e313a";
const TEXT_SECONDARY_COLOR = "#373d4c";
class Main extends React.Component {
  numMatrix = Array(9).fill(Array(9).fill(0));

  state = {
    objMatrix: this.numMatrix.map((row) => {
      return row.map((val: any) => {
        return { value: val, color: TEXT_PRIMARY_COLOR };
      });
    }),
    activeCell: { x: 0, y: 0 },
  };

  onActiveCellChange = (y: number, x: number) => {
    this.setState({
      activeCell: { x: x, y: y },
    });
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

  onNumChange = (newX: number, newY: number) => {
    const { activeCell } = this.state;
    const { x, y } = activeCell;
    const newNum = 3 * newX + newY + 1;

    this.changeNum(y, x, newNum);
  };

  changeNum = (y: number, x: number, num: number) => {
    const { objMatrix } = this.state;
    let newMatrix = objMatrix;

    newMatrix[y][x].value = num;
    newMatrix[y][x].color = TEXT_PRIMARY_COLOR;
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
        { value: 1, color: TEXT_PRIMARY_COLOR },
        { value: 2, color: TEXT_PRIMARY_COLOR },
        { value: 3, color: TEXT_PRIMARY_COLOR },
      ],
      [
        { value: 4, color: TEXT_PRIMARY_COLOR },
        { value: 5, color: TEXT_PRIMARY_COLOR },
        { value: 6, color: TEXT_PRIMARY_COLOR },
      ],
      [
        { value: 7, color: TEXT_PRIMARY_COLOR },
        { value: 8, color: TEXT_PRIMARY_COLOR },
        { value: 9, color: TEXT_PRIMARY_COLOR },
      ],
    ];

    const controlButtons = [
      [
        {
          value: "Clean Cell",
          color: TEXT_PRIMARY_COLOR,
          onClick: this.cleanCell,
        },
      ],
      [
        {
          value: "Clear All",
          color: TEXT_PRIMARY_COLOR,
          onClick: this.clearAllCells,
        },
      ],
      [
        {
          value: "Solve",
          color: TEXT_PRIMARY_COLOR,
          onClick: this.solveProblem,
        },
      ],
    ];

    return (
      <View style={styles.main}>
        <View style={styles.flexRow1}>
          <Grid
            matrix={objMatrix}
            activeCell={activeCell}
            onCellClick={this.onActiveCellChange}
          />
        </View>
        <View style={styles.flexRow2}>
          <Grid matrix={numBoard} onCellClick={this.onNumChange} />
          <Grid matrix={controlButtons} onCellClick={this.onNumChange} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: BACKGROUND_COLOR,
    alignItems: "center",
    flexWrap: "wrap",
  },
  flexRow1: {
    flexDirection: "row",
    marginTop: 20,
  },
  flexRow2: {
    flexDirection: "row",
  },
});

export { Main };
