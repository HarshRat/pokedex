import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login, Signup} from '../screens';

const Stack = createStackNavigator();

const NewUserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerStyle: {
            backgroundColor: '#ee1515',
          },
          headerTintColor: '#f0f0f0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: '#ee1515',
          },
          headerTintColor: '#f0f0f0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export {NewUserStack};
