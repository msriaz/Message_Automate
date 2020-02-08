import React from 'react';
import { Image, Text, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Colors } from "../../../Themes";

export default OnboardingInfo = ({
  navigation
}) => {
  const { navigate } = navigation;
  return <Onboarding
    onSkip={() => navigate('HomeScreen')}
    onDone={() => navigate('HomeScreen')}
    titleStyles={{
      fontSize: 26,
      color: Colors.primary,
      fontWeight: "bold",
      paddingVertical: 14
    }}
    subTitleStyles={{
      fontSize: 16,
      lineHeight: 26,
      color: Colors.secondary,
      textAlign: "center",
      marginBottom: 14
    }}
        pages={[{
                backgroundColor: '#fff',
          image: <Image
            resizeMode={'cover'}
            source={require('../../../Images/info1.png')}
          />,
                title: 'One Telemed',
          subtitle: `Schedule an appointment to see one of our Mental Health Professionals
          \n\t\t\t\t\t\t Swipe to learn more`,
      },
        {
          backgroundColor: '#eaeaea',
          image: <Image source={require('../../../Images/info4.png')} />,
          title: '',
          subtitle: <View>
            <Text style={{ textAlign: 'left', fontSize: 18 }}>
              - See the same provider everytime
            </Text>
            <Text style={{ textAlign: 'left', fontSize: 18 }}>
              - Reduce wait time
            </Text>
            <Text style={{ textAlign: 'left', fontSize: 18 }}>
              - Schedule a home visit
            </Text>
            <Text style={{ textAlign: 'left', fontSize: 18 }}>
              - Visit a public clinic near you
            </Text>
            <Text style={{ textAlign: 'left', fontSize: 18 }}>
              - Private and convineint
            </Text>
          </View>
       ,
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../../../Images/info3.png')} />,
          title: 'Schedule Your Appointment Today',
          subtitle: '',
          },

      ]}
    />

}