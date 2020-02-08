// @flow

import React from 'react'
import { View } from 'react-native'
import ExamplesRegistry from '../../../App/Services/ExamplesRegistry'
import Icon from 'react-native-vector-icons/FontAwesome'

// Example
ExamplesRegistry.addPluginExample('Vector Icons', () =>
  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
    <Icon name='rocket' size={40} color='black' />
    <Icon name='send' size={40} color='black' />
    <Icon name='star' size={40} color='black' />
    <Icon name='trophy' size={40} color='black' />
    <Icon name='warning' size={40} color='black' />
  </View>
)
