import {
  Animated,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
  View,
} from 'react-native'
import React, {useRef} from 'react'

const HomeScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current

  const panResponder: PanResponderInstance = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        })
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.flattenOffset()
      },
    }),
  ).current

  return (
    <View style={styles.main}>
      <View style={styles.containerCat}>
        <Animated.Image
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
            backgroundColor: 'red',
            height: 50,
            width: 50,
          }}
          {...panResponder.panHandlers}
          source={require('../assets/images/cat.png')}
        />
      </View>
      <View style={{flex: 1, backgroundColor: 'green', marginTop: 5}} />
      <View style={{flex: 1, backgroundColor: 'yellow', marginTop: 5}} />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
    paddingHorizontal: 5,
  },
  containerCat: {
    backgroundColor: 'skyblue',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
})

export default HomeScreen
