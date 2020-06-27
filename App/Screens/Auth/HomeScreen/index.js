import React, {memo} from 'react';
import Background from '../../../Components/Background';
import Logo from '../../../Components/Logo';
import Header from '../../../Components/Header';
import Button from '../../../Components/Button';
import Paragraph from '../../../Components/Paragraph';

const HomeScreen = ({navigation}) => (
  <Background>
    <Logo />
    <Header>Fb Automation</Header>
    <Paragraph>Schedule your Automated Messages.</Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}>
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
