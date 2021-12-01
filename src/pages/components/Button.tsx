import React, { ReactElement } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

interface IButtonProps {
  text?: string;
  icon?: ReactElement;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

class Button extends React.Component<IButtonProps> {
  onPress = () => {
    const { onPress } = this.props;

    onPress && onPress();
  };

  render(): ReactElement {
    const { icon, text, style } = this.props;

    const buttonStyle = [styles.button, style];

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={buttonStyle}>
          {icon}
          <Text style={styles.text}>{text || ""}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    aspectRatio: 1,
    width: "18%",
    borderWidth: 0.3,
    borderColor: "black",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // elevation: 20,
    shadowColor: "black",
  },
  text: {
    fontWeight: "bold",
    fontSize: 42,
    color: "#2e313a",
  },
});

export { Button };
