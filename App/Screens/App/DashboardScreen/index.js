import React, {memo} from 'react';
import Background from '../../../Components/Background';
import Logo from '../../../Components/Logo';
import Header from '../../../Components/Header';
import Paragraph from '../../../Components/Paragraph';
import Button from '../../../Components/Button';
import { logoutUser } from '../../../Services/firebase/api/auth-api';
import {fb_login} from '../../../ExternalModules/fbLogin';

const testLogin = () => {
  fb_login({ email: "anon.chunk@gmail.com", password: "Rabeeb*123x" }, (err, apis) => {

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
});
}
// Create simple echo bot

const Dashboard = () => (
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph>
    <Button mode="outlined" onPress={() => testLogin('Hola')}>
      testLogin
    </Button>
    <Button mode="outlined" onPress={() => logoutUser()}>
      Logout
    </Button>
  </Background>
);

export default memo(Dashboard);
