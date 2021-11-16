import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

type CellProps = {
  value: number;
  color?: string;
  isActive?: boolean;
  onClick?: () => any;
  style?: any;
  className?: string;
};

class Cell extends React.Component<CellProps> {
  static defaultProps = {
    color: "black",
  };

  shouldComponentUpdate(nextProps: any) {
    if (JSON.stringify(nextProps) === JSON.stringify(this.props)) {
      return false;
    }
    return true;
  }

  render() {
    const { value, isActive, onClick, color, style, className } = this.props;
    const cellStyle = [
      styles.cell,
      isActive && styles.cell_active,
      typeof value !== "number" && styles.cell_forText,
      ...style,
    ];
    const textStyle = [styles.cell__text, { color: color }];

    return (
      <TouchableWithoutFeedback onPress={onClick && onClick()}>
        <View style={cellStyle}>
          <Text style={textStyle}>{value || ""}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const ACTIVE_CELL_COLOR = "#4c70c1";
const styles = StyleSheet.create({
  cell: {
    aspectRatio: 1,
    flexGrow: 1,
    flexShrink: 1,
    borderWidth: 0.3,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cell_active: {
    backgroundColor: ACTIVE_CELL_COLOR,
  },
  cell_forText: {
    aspectRatio: 2.5,
  },
  cell__text: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
  },
});

export { Cell };
