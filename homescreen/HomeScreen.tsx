import {
  Animated,
  Button,
  Image,
  ImageBackground,
  PanResponder,
  PanResponderInstance,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useRef, useState} from 'react'

interface sprit {
  name: string
  x: number
  y: number
}

const HomeScreen = ({navigation}: {navigation: any}) => {
  const [sprits, setSprits] = useState<sprit[]>([{name: 'cat', x: 0, y: 0}])

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
        <Animated.View
          style={{
            transform: [{translateX: pan.x}, {translateY: pan.y}],
          }}
          {...panResponder.panHandlers}>
          <ImageBackground
            source={require('../assets/images/cat.png')}
            resizeMode="cover"
            style={{height: 50, width: 50}}
          />
        </Animated.View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>Sprit</Text>
          <TextInput style={styles.infoBoxInput} />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>X</Text>
          <TextInput style={styles.infoBoxInput} />
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>Y</Text>
          <TextInput style={styles.infoBoxInput} />
        </View>
      </View>
      <View style={styles.items}>
        {sprits.map(sprit => (
          <View style={styles.item} key={sprit.name}>
            <Image
              source={require('../assets/images/cat.png')}
              style={{width: 50, height: 50, margin: 10}}
            />
            <Button
              title="Add Actions"
              onPress={() =>
                navigation.navigate('AddActions', {sprit: sprit.name})
              }
            />
          </View>
        ))}
        {/* <View> */}
        <TouchableOpacity
          onPress={() => {}}
          style={[styles.item, styles.addItem]}>
          <Text style={{fontSize: 50}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingHorizontal: 5,
    backgroundColor: '#e3e3e3',
  },
  containerCat: {
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    height: 100,
    marginTop: 5,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoBoxText: {fontWeight: 'bold'},
  infoBoxInput: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 12,
    width: 50,
    height: 40,
    padding: 10,
    marginLeft: 10,
  },
  items: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 130,
    marginTop: 5,
    borderRadius: 8,
  },
  item: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    width: 100,
    marginRight: 10,
  },
  addItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HomeScreen
