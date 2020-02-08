import React from 'react';
import { Image, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export const OnboardingInfo = ({

}) => {
    return <Onboarding
        pages={[{
                backgroundColor: '#fff',
                image: <Image source={require('../../../Images/launch-icon.png')} />,
                title: 'Onboarding',
                subtitle: 'Done with React Native Onboarding Swiper',
      },
        {
          backgroundColor: '#eaeaea',
          image: <Image source={require('../../../Images/launch-icon.png')} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../../../Images/launch-icon.png')} />,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        }

      ]}
    />

}