import {StyleSheet, Text, View} from 'react-native'
import React from 'react'

import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {DraxProvider, DraxView, DraxList} from 'react-native-drax'

const ACTIONS: Actions = {
  motion: [
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
  ],
  looks: [],
  controls: [],
  events: [],
}

interface Actions {
  motion: Action[]
  looks: Action[]
  controls: Action[]
  events: Action[]
}
interface Action {
  title: string
  action: string
}

const AddActions = () => {
  const draggableItemList = ACTIONS.motion

  const [selectedActionsList, setSelectedActionsList] = React.useState<
    Action[]
  >([])

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
      <DraxProvider style={{flexDirection: 'row'}}>
        <View style={styles.column}>
          <Text style={styles.colHeading}>Code</Text>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Motion</Text>
            <DraxList
              data={draggableItemList}
              renderItemContent={DragUIComponent}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true}
            />
          </View>
        </View>
        <View style={styles.column}>
          <Text style={styles.colHeading}>Action</Text>
          <DraxView
            style={{height: '100%', width: '100%'}}
            receivingStyle={styles.receiving}
            renderContent={() => (
              <View>
                {selectedActionsList.map((action, index) => (
                  <Text key={index}>{action.title}</Text>
                ))}
              </View>
            )}
            onReceiveDragDrop={event => {
              const selected_item = ACTIONS.motion[event.dragged.payload]
              setSelectedActionsList(list => list.concat(selected_item))
            }}
          />
        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  )
}

export default AddActions

const styles = StyleSheet.create({
  main: {
    height: '100%',
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
    // width: Dimensions.get('window').width / 4 - 12,
    // height: Dimensions.get('window').width / 4 - 12,
    borderRadius: 4,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'steelblue',
    borderWidth: 1,
    marginHorizontal: 5,
  },
  dragging: {
    opacity: 0.2,
  },
  textStyle: {
    fontSize: 18,
  },
})
