import {Button, Image, StyleSheet, View} from 'react-native'
import React from 'react'

const HomeHeader = () => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.logo}
        source={require('../assets/images/scratch-logo.png')}
      />
      <Button title="Sign In" onPress={() => {}} color="transparent" />
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: 80,
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: 'steelblue',
    height: 50,
    width: '100%',
  },
})

export default HomeHeader
