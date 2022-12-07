import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import HomeScreen from './homescreen/HomeScreen'
import HomeHeader from './homescreen/HomeHeader'
import AddActions from './addActions'
import {Background} from './HeaderActionsItems'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <HomeHeader />,
          }}
        />
        <Stack.Screen
          name="AddActions"
          component={AddActions}
          options={{
            title: 'Add Actions',
            headerBackground: () => <Background />,
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
