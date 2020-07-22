/**
 * Helper utility functions to apply
 * checks w.r.t underlying device.
 */


import {
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';

/**
 * Returns true if the screen is in portrait mode
 */
export const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

/**
 * Returns true if the screen is in landscape mode
 */
export const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

/**
 * @param {ScaledSize} dim the dimentions object
 * @param {*} limit the limit on the scaled dimentions
 */
// const msp = (dim, limit) => (dim.scale * dim.width) >= (limit || ((dim.scalse * dim.height) >= limit));


/**
 * Returns true if the device is a iPhoneX
 */
export const isIphoneX = () => {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios'
    && !Platform.isPad
    && !Platform.isTVOS
    && ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
  );
};

/**
 * Returns iphoneXStyle if the device is a iPhoneX
 * else returns regularStyles
 */
export const ifIphoneX = (iphoneXStyle, regularStyle) => {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
};

/**
 * Returns statusBarHeight
 */
export const getStatusBarHeight = (safe) => Platform.select({
  ios: ifIphoneX(safe ? 44 : 30, 20),
  android: StatusBar.currentHeight,
  default: 0,
});

/**
 * Returns bottom space
 */
export const getBottomSpace = () => (isIphoneX() ? 34 : 0);
