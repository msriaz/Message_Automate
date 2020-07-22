import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')


// Examples of metrics you can define:
export const tiny = 5
export const small = tiny * 2 // 10
export const normal = tiny * 3 // 15
export const medium = normal * 2 // 30
// Used via Metrics.baseMargin
/**
 * The available spacing.
 * Please stick with these, and not freestyle it everywhere.
 *
 * 0 = none    - nothing. only here to bust out of a zero-based array.
 * 1 = xsmall  - elements contextually close to each other
 * 2 = small   - for groups of closely related items or perhaps borders
 * 3 = medium  - less than default
 * 4 = default - default spacing beween components
 * 5 = large   - between groups of content that aren't related?
 * 6 = huge    - huge space around components
 */

export const spacing = {
  xsmall: 4,
  small: 8,
  medium: 12,
  default: 16,
  large: 24,
  xlarge: 32,
  huge: 48,
};

export const radius = {
  default: 4,
  double: 8,
  half: 30,
  full: 50,
};

const metrics = {
  ...spacing,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
}

export default metrics
