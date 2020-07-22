import React, { memo } from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Colors, Metrics } from '../../Themes';
import Icon from 'react-native-vector-icons/Ionicons';
import { truncateText } from '../../Utils';

const InfoItem = ({ iconName, infoData, iconColor }) => (
  <View style={styles.container}>
    <Icon size={15} name={iconName} color={iconColor ? iconColor : Colors.primary} />
    <Text style={styles.infoText}>
      {truncateText(infoData, 20)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  infoText: {
    textAlign: 'left',
    fontSize: 13,
    marginLeft: Metrics.xsmall
  },
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingTop: Metrics.xsmall
  }
});

export default memo(InfoItem);
