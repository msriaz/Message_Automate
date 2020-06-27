import React, {memo} from 'react';
import {ActivityIndicator} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import Background from '../../Components/Background';
import Button from '../../Components/Button';
import {Colors} from '../../Themes';
import {login} from '../../ExternalModules/fbLogin';
// import {FIREBASE_CONFIGX} from '../../Services/Config';
// Initialize Firebase
// firebase.initializeApp(FIREBASE_CONFIGX);

const AuthLoadingScreen = ({navigation}) => {
//   firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//       // User is logged in
//       navigation.navigate('DashboardScreen');
//     } else {
//       // User is not logged in
//       navigation.navigate('OnboardingScreen');
//     }
//   });

  const testLogin = () => {
    login(
      {email: 'anon.chunk@gmail.com', password: 'Rabeeb*123x'},
      (err, apis) => {
        debugger;
        // const appState = apis.getAppState();
        // console.log('@@@@@@@@@@@@@@@@app state is', appState);
        // if (err) {
        //     debugger;
        //     res.send(err);
        //     return console.error(err);
        // }

        // apis.listenMqtt((err, message) => {
        //     res.send('Logged in successfully')
        //     // apis.sendMessage(message.body, message.threadID);
        // });
        // apis.getFriendsList((err, data) => {
        //     if(err) return console.error(err);
        //     // var yourID = "000000000000000";
        //     var msg = { body: "Hey Shoaib this message is just for hellow :D" };
        //     apis.sendMessage(msg, data[0].userID);
        //     console.log('friendlist is', data.length, data);
        // });
      },
    );
  };

  return (
    <Background>
      {/* <ActivityIndicator size="large" color={Colors.primary} /> */}
      <Button mode="outlined" onPress={() => testLogin('Hola')}>
        testLogin
      </Button>
    </Background>
  );
};

export default memo(AuthLoadingScreen);
