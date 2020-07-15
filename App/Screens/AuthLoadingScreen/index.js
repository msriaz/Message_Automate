import React, {memo} from 'react';
import {ActivityIndicator, Image, Text} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import Background from '../../Components/Background';
import Button from '../../Components/Button';
import {Colors} from '../../Themes';
import {login} from '../../ExternalModules/fbLogin';
import {LoginScreenComponent} from './login';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  ShareDialog,
  ShareApi,
} from 'react-native-fbsdk';
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

  //Create response callback.
  const _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ', error);
    } else {
      console.log('Success fetching data: ', result);
    }
  };

  const shareLinkContent = {
    contentType: 'link',
    contentUrl: 'https://facebook.com',
    contentDescription: 'Wow, check out this great site!',
  };

  const shareLinkWithShareDialog = () => {
    ShareDialog.canShow(shareLinkContent)
      .then(function(canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      })
      .then(
        function(result) {
          if (result.isCancelled) {
            console.log('Share cancelled');
          } else {
            console.log('Share success with postId: ' + result.postId);
          }
        },
        function(error) {
          console.log('Share fail with error: ' + error);
        },
      );
  };

  const sharePhoto = {
    imageUrl: 'http://hellopakistanmag.com/wp-content/uploads/2020/06/IMG_4985-1030x438.jpg', // <diff_path_for_ios>
    userGenerated: false,
    caption: 'hello',
  };
  const sharePhotoContent = {
    contentType: 'photo',
    photos: [sharePhoto],
  };

  const shareAPI = () => {
    ShareApi.canShare(shareLinkContent)
      .then(function(canShare) {
        if (canShare) {
          console.log('it can share', canShare);
          return ShareApi.share(shareLinkContent, '/me', 'Some message.');
        }
      })
      .then(result => {
        alert(JSON.stringify(result));
      })
      .catch(error => {
        console.log('@error in share api', JSON.stringify(error));
        alert(JSON.stringify(error));
      });
  };

  const testLogin = () => {
    // CookieManager.getAll().then(cookies => {
    //   console.log('CookieManager.getAll =>', cookies);
    //   debugger;
    // });

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
      <Image
        source={{ uri: 'https://m.facebook.com/photo.php?fbid=3071133196273137&id=100001294611410&set=a.130332827019870&source=11&refid=17' }}
        style={{width: 150, height:150, borderRadius: 150, backgroundColor:'red'}}
      />
      <Text>
        Ammar Riaz
        </Text>
      <Button mode="outlined" onPress={() => testLogin('Hola')}>
        testLogin
      </Button>
      <Button mode="outlined" onPress={() => shareLinkWithShareDialog()}>
        share
      </Button>
      <Button mode="outlined" onPress={() => shareAPI()}>
        share API
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          // Create a graph request asking for user information with a callback to handle the response.
          const infoRequest = new GraphRequest(
            '/me', null,
            // {
            //   httpMethod: 'GET',
            //   version: 'v7.0',
            //   accessToken:
            //     'EAAEJn9afgvQBAFfSPCkBZCDnwL0kYhUQFe3pbp4MBoa956IOlvyZAZAHGtCSyEYrOAlEu9Wp8RRmpaCNsWTYXt1w3QVBMcxdYDJbCVOBwpg33PZA3qpQMetn0V6BwWB6ZBD41f5ZAVFrwQkb4XZBuVht5PsjcteQAxZCZAfDbjvZCsMRzKHrQ5xuikO6wBXvQo2lkdrRaeI9UbDfRRJR6xG6Vh',
            // },
            _responseInfoCallback,
          );
          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start();
        }}>
        fetch my data
      </Button>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.log(data.accessToken.toString());
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </Background>
  );
};
// export default memo(AuthLoadingScreen);
export default memo(LoginScreenComponent);
