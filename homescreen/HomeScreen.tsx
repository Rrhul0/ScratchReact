import {
  Animated,
  Button,
  Image,
  ImageBackground,
  PanResponder,
  PanResponderInstance,
  Pressable,
  Route,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useRef, useState} from 'react'
import {Action} from '../addActions'

export interface Sprit {
  name: string
  x: number
  y: number
  say?: 'Hello' | 'Hmmm...'
  actions: Action[]
}

const HomeScreen = ({route, navigation}: {route: Route; navigation: any}) => {
  const [sprits, setSprits] = useState<Sprit[]>([
    route.params
      ? route.params.sprits
      : {
          name: 'cat',
          x: 0,
          y: 0,
          actions: [],
        },
  ])
  const [selectedSprit, setSelectedSprit] = useState<number>(0)
  //   const [say, setSay] = useState<Array>([])

  //   const [animations, setAnimations] = useState([{scale:}])

  const animationScale = useRef({
    scale: new Animated.Value(1),
    rotate: new Animated.Value(0),
  }).current

  const pan = useRef(new Animated.ValueXY()).current

  pan.setValue({
    x: sprits[selectedSprit].x,
    y: sprits[selectedSprit].y,
  })

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

  function startAction() {
    sprits.forEach(sprit => {
      sprit.actions.forEach(action => {
        switch (action.action) {
          case 'x+50':
            Animated.timing(pan, {
              toValue: {x: pan.x._value + 50, y: pan.y._value},
              duration: 10,
              useNativeDriver: false,
            }).start()
            break
          case 'y+50':
            Animated.timing(pan, {
              toValue: {x: pan.x._value, y: pan.y._value + 50},
              duration: 10,
              useNativeDriver: false,
            }).start()
            break
          case 'center':
            Animated.timing(pan, {
              toValue: {x: 0, y: 0},
              duration: 10,
              useNativeDriver: false,
            }).start()
            break
          case '+90':
            Animated.timing(animationScale.rotate, {
              toValue: animationScale.rotate._value + 90,
              duration: 10,
              useNativeDriver: false,
            }).start()
            break
          case 'size+50':
            Animated.timing(animationScale.scale, {
              toValue: animationScale.scale._value + 0.5,
              duration: 10000,
              useNativeDriver: false,
            }).start()
            break
          case 'size-50':
            Animated.timing(animationScale.scale, {
              toValue: animationScale.scale._value - 0.5,
              duration: 10000,
              useNativeDriver: false,
            }).start()
            break
          case 'size':
            Animated.timing(animationScale.scale, {
              toValue: 1,
              duration: 10000,
              useNativeDriver: false,
            }).start()
            break
          case 'hello':
            // setSay('Hello')
            setSprits(spritsTemp => {
              spritsTemp[0].say = 'Hello'
              return [...spritsTemp]
            })
            break
          case 'hmmm':
            // setSay('Hmmmm...')
            setSprits(spritsTemp => {
              spritsTemp[0].say = 'Hmmm...'
              return [...spritsTemp]
            })
            break
          default:
            break
        }
      })
    })
    return
  }

  return (
    <View style={styles.main}>
      <View style={styles.containerCat}>
        <Pressable
          onPress={startAction}
          style={{position: 'absolute', bottom: 20, right: 10}}>
          <Text>Start</Text>
        </Pressable>
        {sprits.map((sprit, index) => (
          <Animated.View
            key={index}
            style={[
              index === selectedSprit
                ? {
                    transform: [
                      {translateX: pan.x},
                      {translateY: pan.y},
                      {scale: animationScale.scale},
                      {rotate: animationScale.rotate._value + 'deg'},
                    ],
                  }
                : {transform: [{translateX: sprit.x}, {translateY: sprit.y}]},
            ]}
            onTouchStart={() => {
              setSprits(spritsTemp => {
                spritsTemp[selectedSprit].x = pan.x._value
                spritsTemp[selectedSprit].y = pan.y._value
                return [...spritsTemp]
              })
              setSelectedSprit(index)
            }}
            {...(index === selectedSprit ? panResponder.panHandlers : '')}>
            {sprit.say ? <Text style={styles.say}>{sprit.say}</Text> : ''}
            <ImageBackground
              source={
                sprit.name === 'cat'
                  ? require('../assets/images/cat.png')
                  : require('../assets/images/dog.png')
              }
              resizeMode="cover"
              style={{height: 50, width: 50}}
            />
          </Animated.View>
        ))}
      </View>
      <View style={styles.info}>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>Sprit</Text>
          <Text style={styles.infoBoxInput}>{sprits[selectedSprit].name}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>X</Text>
          <Text style={styles.infoBoxInput}>
            {sprits[selectedSprit].x.toString()}
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>Y</Text>
          <Text style={styles.infoBoxInput}>
            {sprits[selectedSprit].y.toString()}
          </Text>
        </View>
      </View>
      <View style={styles.items}>
        {sprits.map((sprit, index) => (
          <View style={styles.item} key={sprit.name}>
            {sprits.length > 1 ? (
              <Pressable
                style={styles.remove}
                onPress={() => {
                  setSprits(spritsTemp => {
                    spritsTemp.splice(index, 1)
                    return [...spritsTemp]
                  })
                  setSelectedSprit(0)
                }}>
                <Text>X</Text>
              </Pressable>
            ) : (
              ''
            )}
            <Image
              source={
                sprit.name === 'cat'
                  ? require('../assets/images/cat.png')
                  : require('../assets/images/dog.png')
              }
              style={{width: 50, height: 50, margin: 10}}
            />
            <Button
              title="Add Actions"
              onPress={() =>
                navigation.navigate('AddActions', {
                  sprits,
                })
              }
            />
          </View>
        ))}
        {sprits.length < 2 ? (
          <TouchableOpacity
            onPress={() => {
              setSprits(spritsTemp => {
                const newSprit: Sprit = {
                  name: spritsTemp[0].name === 'cat' ? 'dog' : 'cat',
                  x: 0,
                  y: 0,
                  actions: [],
                }
                return [...spritsTemp, newSprit]
              })
            }}
            style={[styles.item, styles.addItem]}>
            <Text style={{fontSize: 50}}>+</Text>
          </TouchableOpacity>
        ) : (
          ''
        )}
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
  say: {
    marginLeft: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 2,
    textAlign: 'center',
  },
  remove: {
    backgroundColor: '#fb305490',

    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 8,
    fontSize: 30,
    color: 'red',
    fontWeight: 'bold',
    position: 'absolute',
    top: -5,
    right: -5,
  },
})

export default HomeScreen
