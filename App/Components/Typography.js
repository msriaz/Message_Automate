import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from '../Themes';


const Typography = ({ children, style, ...rest }) => {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
}


const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    // lineHeight: 26,
    // width: '60%',
    color: Colors.secondary,
    textAlign: "center",
    // marginBottom: 14,
    // flexWrap: 'wrap'
  }
});

export default memo(Typography);
