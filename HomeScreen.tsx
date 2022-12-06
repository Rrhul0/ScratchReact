import {Button, Text} from 'react-native'
import React from 'react'

const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <>
      <Text>Home Screen it is</Text>
      <Button
        title="Go to Jane's profile"
        onPress={() => navigation.navigate('Test', {name: 'Jane'})}></Button>
    </>
  )
}

export default HomeScreen
