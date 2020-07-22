import React, { memo, useEffect } from 'react'
import { TouchableOpacity, FlatList } from 'react-native'
import { RadioButton } from 'react-native-paper'
import Typography from '../Typography'
const RadioGroup = ({ data }) => {
  const [value, setValue] = React.useState('first')
console.log(' medical centers', data, value)
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={(value) => setValue(value)}>
        <Typography>{item?.label}</Typography>
        <RadioButton value={item?.id} />
      </TouchableOpacity>
    )
  }

  return (
    <RadioButton.Group value={value}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        // extraData={data}
        // style={styles.listContainer}
      />
    </RadioButton.Group>
  )
}

export default memo(RadioGroup)
