import React, { memo } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { Colors, Metrics } from '../Themes';
import * as deviceInfo from '../Utils/device';
import Typography from './Typography';

const Background = ({ children, title, width = 0.95 }) => (
  <SafeAreaView style={styles.wrapper}>
    {
      title ?
        <View style={styles.header} >
          <Typography style={styles.headerTitle}>
            {title}
          </Typography>
        </View>
        : null
    }
    <View style={styles.background}>
      <KeyboardAvoidingView style={[styles.container, { maxWidth: Metrics.screenWidth * width }]} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  background: {
    flex: 1,
    width: "100%",
    paddingTop: deviceInfo.isIphoneX() ? 30 : 35, // TODO: Change top padding to status bar height
    // backgroundColor: 'red'
  },
  header: {
    width: "100%",
    paddingTop: deviceInfo.isIphoneX() ? 25 : 10,
    backgroundColor: Colors.primary,
    height: deviceInfo.isIphoneX() ? 80 : 60,
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.surface,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: Metrics.screenWidth * 0.95,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default memo(Background);
