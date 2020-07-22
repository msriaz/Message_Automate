import React, { memo } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Colors, Metrics } from '../../Themes'
import Avatar from './Avatar'
import RoundedButton from '../RoundedButton'
import Icon from 'react-native-vector-icons/Ionicons'
import InfoItem from './InfoItem'
import { truncateText } from '../../Utils'
import Typography from '../Typography'

const DoctorProfile = ({ containerStyles, data }) => {
  return (
    <View style={styles.container}>
      <Avatar imageUrl={data.doctorImgUrl} />
      <View style={[styles.content, containerStyles]}>
        <Text style={styles.titleText}>{truncateText(data.doctorName, 20)}</Text>
        <Text style={styles.subtitleText}>{truncateText(data.clinicName, 20)}</Text>
        {/* <InfoItem iconName={'md-person'} infoData={data.customerName} />
        <InfoItem iconName={'md-alert'} infoData={data.appointmentStatus} />
        <View style={styles.timeDateContainer}>
          <InfoItem iconName={'md-calendar'} infoData={data.appoitmentDate} />
          <InfoItem iconName={'md-time'} infoData={data.time} />
        </View> */}
        {(
          <RoundedButton mode="contained" width={0.5} onPress={() => {}}>
            <Icon size={12} name={'md-list-box'} color={'white'} />{' '}
            <Typography style={styles.buttonLabel}>Send Message</Typography>
          </RoundedButton>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Metrics.small,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: Metrics.screenWidth * 0.9,
    paddingTop: Metrics.small,
    paddingLeft: Metrics.medium,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'lightgrey',
    backgroundColor: Colors.surface,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor: 'black',
    shadowOpacity: 0.1,
  },
  content: {
    marginLeft: Metrics.medium,
  },
  titleText: {
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
  },
  subtitleText: {
    textAlign: 'left',
    fontSize: 13,
  },
  timeDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Metrics.screenWidth * 0.5,
    paddingVertical: Metrics.xsmall,
  },
  buttonLabel: {
    textAlign: 'left',
    fontSize: 12,
  },
})

export default memo(DoctorProfile)
