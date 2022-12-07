import {
  Dimensions,
  Pressable,
  Route,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, {useState} from 'react'

import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {DraxProvider, DraxView, DraxList} from 'react-native-drax'
import {Sprit} from './homescreen/HomeScreen'

const ACTIONS: Action[] = [
  {
    title: 'Move X by 50',
    action: 'x+50',
  },
  {
    title: 'Move Y by 50',
    action: 'y+50',
  },
  {
    title: 'rotate 360',
    action: '+360',
  },
  {
    title: 'Go to center',
    action: 'center',
  },
  {
    title: 'Increase Size By 50%',
    action: 'size+50',
  },
  {
    title: 'Change Size Back to 100%',
    action: 'size',
  },
  {
    title: 'Decrease Size By 50%',
    action: 'size-50',
  },
  {
    title: 'Say HELLO',
    action: 'hello',
  },
  {
    title: 'Think Hmmm...',
    action: 'hmmm',
  },
  {
    title: 'Decrease Size By 50%',
    action: 'size-50',
  },
]

export interface Action {
  title: string
  action: string
}

const AddActions = ({route, navigation}: {route: Route; navigation: any}) => {
  const [sprits, setSprits] = useState<Sprit[]>(route.params.sprits)
  const [selectedSprit, setSelectedSprit] = useState<number>(0)

  const DragUIComponent = ({item, index}: {item: Action; index: number}) => {
    return (
      <DraxView
        style={[styles.centeredContent, styles.draggableAction]}
        dragPayload={index}
        longPressDelay={150}
        key={index}>
        <Text style={styles.textStyle}>{item.title}</Text>
      </DraxView>
    )
  }

  return (
    <GestureHandlerRootView style={styles.main}>
      <DraxProvider style={{flexDirection: 'row', height: '100%'}}>
        <View style={styles.column}>
          <Text style={styles.colHeading}>Code</Text>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Motion</Text>
            <DraxList
              data={ACTIONS}
              renderItemContent={DragUIComponent}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true}
            />
          </View>
        </View>
        <View style={styles.column}>
          <Text style={styles.colHeading}>Action</Text>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: 'gray',
            }}>
            {sprits.map((sprit, index) => (
              <Pressable
                style={[
                  index === selectedSprit ? {backgroundColor: 'steelblue'} : {},
                  {flex: 1},
                ]}
                onPress={() => setSelectedSprit(index)}>
                <Text style={styles.textStyle}>{sprit.name}</Text>
              </Pressable>
            ))}
          </View>
          <DraxView
            style={{height: '100%', width: '100%'}}
            receivingStyle={styles.receiving}
            renderContent={() => (
              <View>
                {sprits[selectedSprit].actions.map((action, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.textStyle,
                      styles.centeredContent,
                      styles.draggableAction,
                    ]}>
                    {action.title}
                  </Text>
                ))}
              </View>
            )}
            onReceiveDragDrop={event => {
              const selected_item = ACTIONS[event.dragged.payload]
              setSprits(spritsTemp => {
                spritsTemp[selectedSprit].actions =
                  spritsTemp[selectedSprit].actions.concat(selected_item)
                return [...spritsTemp]
              })
            }}
          />
        </View>
      </DraxProvider>
      <Pressable
        style={{padding: 5}}
        onPress={() => {
          navigation.navigate('Home', {sprits})
        }}>
        <Text style={styles.donebtn}>Done</Text>
      </Pressable>
    </GestureHandlerRootView>
  )
}

export default AddActions

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get('window').height - 100,
    width: '100%',
    paddingHorizontal: 2,
    paddingVertical: 5,
    backgroundColor: '#e3e3e3',
  },
  column: {
    marginHorizontal: 3,
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
  colHeading: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 40,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: 'Black',
  },
  section: {},
  sectionHeading: {
    textAlign: 'center',
    padding: 5,
    // backgroundColor: 'steelblue',
    color: 'steelblue',
    borderBottomWidth: 1,
    borderColor: 'steelblue',
    fontWeight: 'bold',
    fontSize: 25,
  },
  centeredContent: {
    borderRadius: 10,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  draggableAction: {
    borderRadius: 4,
    marginTop: 5,
    borderColor: 'steelblue',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  dragging: {
    opacity: 0.2,
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
  },
  donebtn: {
    backgroundColor: 'steelblue',
    borderRadius: 5,
    padding: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
