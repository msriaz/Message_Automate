import {StatusBar, Platform, View} from 'react-native';
import {WebView, } from 'react-native-webview';
// import get from 'lodash/get';
// import compose from 'lodash/fp/compose';
import React, {useState, useCallback, createRef} from 'react';
import {getCookies} from './utils';
// import session from '../../utils/session';
import Button from '../../Components/Button';
import {getFriendsList} from './getFriendList';
const USER_AGENT = Platform.select({
  ios:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1',
});

const INJECTED_JAVASCRIPT = `(function() {
  window.ReactNativeWebView.postMessage(document.links);
})();`;

const SendMessageJS = `(function() {
  document.getElementById('composerInput').value = 'Hello Ammar'
  document.getElementsByName('send')[0].disabled = false 
  document.getElementsByName('send')[0].click()
  
})();`;

export const LoginScreenComponent = () => {
  // const dispatch = useDispatch();
  const [webViewHeight, setWebViewHeight] = useState(0);
  const webViewRef = createRef(null);
  const onMessage = useCallback(({ nativeEvent }) => {
    console.log('webView Height', nativeEvent);
    // setWebViewHeight(Number(nativeEvent.data));
  }, []);

  const onNavigationStateChange = (navState) => { 
    console.log('nav state', navState);
  }
  //   useCallback(async () => {
  //   const cookies = await getCookies();

  //   console.log('cookies are', cookies);
  //   // const tokensCookie = get(cookies, 'datr');

  //   // if (tokensCookie) {
  //   //   session.setTokens(tokensCookie);
  //   //   await session.saveToStorage();
  //   //   await dispatch(authenticationActions.loadCurrentProfile());
  //   // }
  // }, []);
  const printResponse = response => {
    console.log('response is', response);
  };

  const sendMessage = () => {
    webViewRef.current.injectJavaScript(SendMessageJS);
  }

  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>
      <StatusBar barStyle="dark-content" backgroundColor={'orange'} />
      {/* {session.getArrivalKey() && !session.getAccessToken() && ( */}
 
      <WebView
        ref= {webViewRef}
        allowFileAccess={false}
        allowsBackForwardNavigationGestures={false}
        allowsLinkPreview={false}
        // androidHardwareAccelerationDisabled
        // applicationNameForUserAgent='MemberApplication/1.0.0'
        automaticallyAdjustContentInsets
        directionalLockEnabled
        domStorageEnabled
        height={500}
        hideKeyboardAccessoryView
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        keyboardDisplayRequiresUserAction
        onMessage={onMessage}
        onNavigationStateChange={onNavigationStateChange}
        overScrollMode="never"
        saveFormDataDisabled={false}
        sharedCookiesEnabled
        startInLoadingState
        userAgent={USER_AGENT}
        style={{width: '100%', height: '100%', marginTop: 25}}
        source={{
          uri: 'https://m.facebook.com/shoaibkhazer/friends`',
        }}
      />
      <Button mode="outlined" onPress={() => getFriendsList(printResponse)}>
        Fetch Friend List
      </Button>
      <Button mode="outlined" onPress={() => sendMessage()}>
        Send Message
      </Button>
      {/* )} */}
    </View>
  );
};
