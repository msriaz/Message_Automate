import React, { memo } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Images } from '../../Themes'

const getDrAvatar = (imageUrl) => {
  if (imageUrl) {
    return { uri: imageUrl }
  }
  return Images.drAvatar
}
const Avatar = ({ imageUrl }) => (
  <Image resizeMode={'cover'} source={getDrAvatar(imageUrl)} style={styles.image} />
)

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 12,
    // backgroundColor: 'red'
  },
})

export default memo(Avatar)
