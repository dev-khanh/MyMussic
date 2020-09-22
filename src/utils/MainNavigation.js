import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginUserContainer from '../container/LoginUserContainer';
import MainAppContainer from '../container/MainAppContainer';
import UpdateContaner from '../container/UpdateContainer';
const Stack = createStackNavigator();
function MainNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginUserContainer}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Main" component={MainAppContainer} />
        <Stack.Screen name="Update" component={UpdateContaner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainNavigation;
