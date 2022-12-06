import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TestScreen from './TestScreen'
import HomeScreen from './HomeScreen'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Welcome',
          }}
        />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
