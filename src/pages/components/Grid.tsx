import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "../../style";
import { Cell } from "./Cell";

type GridProps = {
  matrix: any[][];
  activeCell?: any;
  onCellClick?: any;
  cellsStyle?: object;
  style?: StyleSheet<ViewStyle>;
};

class Grid extends React.Component<GridProps> {
  onCellClick = (y: number, x: number) => {
    const { matrix, onCellClick } = this.props;

    if (!!matrix[y][x].onClick) {
      matrix[y][x].onClick();
    } else if (!!onCellClick) {
      onCellClick(y, x);
    }
  };

  render() {
    const { matrix, activeCell, cellsStyle, style } = this.props;

    return (
      <View style={[styles.grid, style]}>
        {matrix.map((row, y) => {
          return (
            <View key={y + ""} style={styles.grid__row}>
              {row.map((cell, x) => {
                return (
                  <Cell
                    key={y + "" + x}
                    value={cell.value}
                    color={cell.color}
                    isActive={x === activeCell?.x && y === activeCell?.y}
                    onClick={() => () => this.onCellClick(y, x)}
                    style={[
                      cellsStyle,
                      y === 3 || y === 6 ? styles.cell_boldTopBorder : null,
                      x === 3 || x === 6 ? styles.cell_boldLeftBorder : null,
                    ]}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  grid: {
    flexGrow: 1,
    flexShrink: 1,
    borderWidth: 2,
    borderColor: Colors.TEXT_PRIMARY,
  },
  grid__row: {
    flexShrink: 1,
    flexDirection: "row",
  },
  cell_boldTopBorder: {
    borderTopWidth: 2,
    borderColor: Colors.TEXT_PRIMARY,
  },
  cell_boldLeftBorder: {
    borderLeftWidth: 2,
    borderColor: Colors.TEXT_PRIMARY,
  },
});

export { Grid };
