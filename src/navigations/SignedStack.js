import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignedHome, PokePage, Party} from '../screens';
import {Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const SignedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignedHome"
        component={SignedHome}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#ee1515',
          },
          headerTintColor: '#f0f0f0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => auth().signOut()}
              style={styles.button}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PokePage"
        component={PokePage}
        options={({route}) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: '#ee1515',
          },
          headerTintColor: '#f0f0f0',
          headerTitleStyle: {
            fontWeight: 'bold',
            textTransform: 'capitalize',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => auth().signOut()}
              style={styles.button}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Party"
        component={Party}
        options={{
          title: 'Party',
          headerStyle: {
            backgroundColor: '#ee1515',
          },
          headerTintColor: '#f0f0f0',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => auth().signOut()}
              style={styles.button}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: '#f0f0f0',
    paddingBottom: 12,
    paddingTop: 10,
    width: 80,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 15,
  },
  buttonText: {
    textAlign: 'center',
    color: '#f0f0f0',
  },
});

export {SignedStack};
