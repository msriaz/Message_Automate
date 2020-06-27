import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen';
import AuthLoadingScreen from '../Screens/AuthLoadingScreen';
import DashboardScreen from '../Screens/App/DashboardScreen';
import ForgotPasswordScreen from '../Screens/Auth/ForgotPasswordScreen';
import LoginScreen from '../Screens/Auth/LoginScreen';
import RegisterScreen from '../Screens/Auth/RegisterScreen';
import HomeScreen from '../Screens/Auth/HomeScreen';
import OnboardingScreen from '../Screens/Auth/OnboardingScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    OnboardingScreen: {screen: OnboardingScreen},
    HomeScreen: {screen: HomeScreen},
    LoginScreen: {screen: LoginScreen},
    RegisterScreen: {screen: RegisterScreen},
    DashboardScreen: {screen: DashboardScreen},
    ForgotPasswordScreen: {screen: ForgotPasswordScreen},
    AuthLoadingScreen: {screen: AuthLoadingScreen},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'AuthLoadingScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

export default createAppContainer(PrimaryNav);
