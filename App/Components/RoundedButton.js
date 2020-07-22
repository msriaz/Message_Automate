import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { Colors, Metrics } from '../Themes';


const BTN_BACKGROUND_COLOR = {
  outlined: Colors.surface,
  contained: Colors.primary,
};

const BTN_LABEL_COLOR = {
  outlined: Colors.primary,
  contained: Colors.white,
};

const RoundedButton = ({ mode, style, width, children, ...props }) => (
  <PaperButton
    style={[
      styles.button,
      {
        backgroundColor: BTN_BACKGROUND_COLOR[mode],
        width: Metrics.screenWidth * width,
      },
      style
    ]}
    labelStyle={[
      styles.text,
      { color: BTN_LABEL_COLOR[mode] }
    ]}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    borderRadius: 20
  },
  text: {
    fontWeight: "bold",
    fontSize: 12,
  }
});

export default memo(RoundedButton);