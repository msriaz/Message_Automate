import React, { memo, useEffect } from 'react'
import Background from '../../../Components/BackgroundX'

import DoctorProfile from '../../../Components/DoctorProfile'
// import { useDispatch } from 'react-redux'
// import { useSelector } from '../../../Utils'

// import AppointmentActions from '../../../Stores/Appointments/Actions'
// import * as AppointmentSelectors from '../../../Stores/Appointments/Selectors'
// import * as AuthSelectors from '../../../Stores/Auth/Selectors'

import { FlatList } from 'react-native'

const data = [
  {
    id: 1,
    doctorImgUrl: null,
    doctorName: 'Muhammad Ali Qasim',
    clinicName: 'Cosmetic Clinic',
    appoitmentDate: '10.10.2020',
    description: 'closed',
    reportImgUrl: 'https://www.google.com',
    time: '9:00 pm',
    customerName: 'Omer Jalal',
  },
  {
    id: 2,
    doctorImgUrl: null,
    doctorName: 'Muhammad Ali Qasim',
    clinicName: 'Cosmetic Clinic',
    appoitmentDate: '10.10.2020',
    description: 'confirmed',
    reportImgUrl: null,
    time: '9:00 pm',
    customerName: 'Omer Jalal',
  },
  {
    id: 3,
    doctorImgUrl: null,
    doctorName: 'Muhammad Ali Qasim',
    clinicName: 'Cosmetic Clinic',
    appoitmentDate: '10.10.2020',
    description: 'closed',
    reportImgUrl: null,
    time: '9:00 pm',
    customerName: 'Omer Jalal',
  },
  {
    id: 4,
    doctorImgUrl: null,
    doctorName: 'Muhammad Ali Qasim',
    clinicName: 'Cosmetic Clinic',
    appoitmentDate: '10.10.2020',
    description: 'confirmed',
    reportImgUrl: null,
    time: '9:00 pm',
    customerName: 'Omer Jalal',
  },
  {
    id: 5,
    doctorImgUrl: null,
    doctorName: 'Muhammad Ali Qasim',
    clinicName: 'Cosmetic Clinic',
    appoitmentDate: '10.10.2020',
    description: 'confirmed',
    reportImgUrl: null,
    time: '9:00 pm',
    customerName: 'Omer Jalal',
  },
  {
    id: 6,
    doctorImgUrl: null,
    doctorName: 'Muhammad Ali Qasim',
    clinicName: 'Cosmetic Clinic',
    appoitmentDate: '10.10.2020',
    description: 'closed',
    reportImgUrl: null,
    time: '9:00 pm',
    customerName: 'Omer Jalal',
  },
  {
    id: 7,
    doctorImgUrl: null,
    doctorName: 'Muhammad Ali Qasim',
    clinicName: 'Cosmetic Clinic',
    appoitmentDate: '10.10.2020',
    description: 'confirmed',
    reportImgUrl: null,
    time: '9:00 pm',
    customerName: 'Omer Jalal',
  },
  {
    id: 8,
    doctorImgUrl: null,
    doctorName: 'Muhammad Ali Qasim',
    clinicName: 'Cosmetic Clinic',
    appoitmentDate: '10.10.2020',
    description: 'confirmed',
    reportImgUrl: null,
    time: '9:00 pm',
    customerName: 'Omer Jalal',
  },
  {
    id: 9,
    doctorImgUrl: null,
    doctorName: 'Muhammad Ali Qasim',
    clinicName: 'Cosmetic Clinic',
    appoitmentDate: '10.10.2020',
    description: 'closed',
    reportImgUrl: null,
    time: '9:00 pm',
    customerName: 'Omer Jalal',
  },
  {
    id: 10,
    doctorImgUrl: null,
    doctorName: 'Muhammad Ali Qasim',
    clinicName: 'Cosmetic Clinic',
    appoitmentDate: '10.10.2020',
    description: 'closed',
    reportImgUrl: null,
    time: '9:00 pm',
    customerName: 'Omer Jalal',
  },
]
const FriendList = () => {
  // const dispatch = useDispatch()
  // const appointments = useSelector(AppointmentSelectors.getAppointments)
  // const appointmentsBanner = useSelector(AppointmentSelectors.getAppointmentsBanner)
  // const appointmentsBannerLoading = useSelector(AppointmentSelectors.getAppointmentsBannerLoading)
  // const user = useSelector(AuthSelectors.getUser)

  // useEffect(() => {
  //   fetchAppointments()
  //   fetchAppointmentsBanner()
  // }, [])

  // const fetchAppointments = async () => {
  //   await dispatch(AppointmentActions.fetchAppointments({ customerId: user?.id }))
  // }

  // const fetchAppointmentsBanner = async () => {
  //   await dispatch(AppointmentActions.fetchAppointmentsBanner())
  // }

  return (
    <Background title={'Friend List'} width={1}>
      <FlatList
        data={data}
        renderItem={({ item }) => <DoctorProfile data={item} />}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        // style={styles.listContainer}
      />
    </Background>
  )
}

export default memo(FriendList)
