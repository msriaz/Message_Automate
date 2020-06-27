import React from 'react';
import { Image, Text, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { Colors } from "../../../Themes";


/**
 * Please verify text for info 2:
Depression
Anxiety
Bipolar disorder
ADHO
schizophrenia

Tell us your symptoms and see one of your psychiatrists or Psychiatric Nurse Practitioner.


Please verify text for info 3:

Prescriptions

Our provider will send your prescriptions electrically to the pharmacy of your choice.
*/

const info1 = {uri: 'https://wallpaperaccess.com/full/1308869.jpg'}
const info3 = {uri: 'https://wallpaperplay.com/walls/full/2/0/d/215249.jpg'}
const info4 = {uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcoaQiyXzjcOILsHcaW47ugeblM_EdShoTteaOHOR-YfrFJHA&s'}

const infoBullets = {
  0: [
    'See the same provider everytime',
    'Reduce wait time',
    'Schedule a home visit',
    'Visit a public access kiosk near you',
    'Private and convenient'
  ],
  1: [
    'Depression',
    'Anxiety',
    'Bipolar disorder',
    'Ad Hoc',
    'Schizophrenia'
  ]
}

const renderImage = (imgSrc) => {
  return (
    <Image
      style={styles.imageStyle}
      resizeMode={'repeat'}
      source={imgSrc}
    />
  )
}

const renderInfoBullets = (data, imgSrc) => {
  return <View style={styles.bulletContainer}>
    {renderImage(imgSrc)}
    {data.map((item) => {
    return <Text style={styles.bulletItem}>
      - {item}
    </Text>
    })}
  </View>
}
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
          image: renderImage(info1) ,
                title: 'Fb Automation',
          subtitle: `Schedule a message to your loved ones
          \n\t\t\t\t\t\t Swipe to learn more`,
      },
          {
            backgroundColor: '#fff',
            image: renderImage(info4),
            // title: '',
            title: 'Easy to use',
            subtitle: 'Lorium ipsum text here about application'
            ,
          },
        {
          backgroundColor: '#fff',
          image: renderImage(info3),
          title: 'Features',
          subtitle: 'Lorium ipsum text here about application',
          }
      ]}
    />

}

const styles = {
  title: {
    textAlign: 'center',
    fontSize: 26,
    color: '#fff',
    paddingBottom: 15,
  },
  titleLight: {
    color: '#000',
  },
  imageStyle: {
    width: '100%',
    marginBottom: 25,
    // height: 150,  
    // backgroundColor:'yellow'
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    color: '#414757',
  },
  bulletContainer: {
    // backgroundColor: 'red',
    width: '100%',
    // paddingHorizontal: 25,
    marginVertical:25
    // position: 'absolute',
    // flex:1,
    
  },
  bulletItem: {
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 25,
    paddingHorizontal: 25,
    color: '#414757',
  },
  
  subtitleLight: {
    color: 'rgba(0, 0, 0, 0.7)',
  },
};