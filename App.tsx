import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TestScreen from './TestScreen'
import HomeScreen from './homescreen/HomeScreen'
import HomeHeader from './homescreen/HomeHeader'

const Stack = createNativeStackNavigator()

const App = ({navigation}: {navigation: any}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <HomeHeader navigation={navigation} />,
          }}
        />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
