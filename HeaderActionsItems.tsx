import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

export const Done = () => {
  const navigator = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigator.goBack()}>
      <Text>Done</Text>
    </TouchableOpacity>
  )
}

export const Background = () => (
  <View style={{backgroundColor: 'steelblue', height: '100%', width: '100%'}} />
)
