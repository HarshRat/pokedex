import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
// import {AuthProvider} from './contexts/AuthContext';
import {AppNavigator} from './navigations';

const App = () => {
  return (
    // <Fragment>
    //   <AuthProvider>
    //     <StatusBar
    //       barStyle="light-content"
    //       backgroundColor="transparent"
    //       translucent={true}
    //     />
    //     <AppNavigator />
    //   </AuthProvider>
    // </Fragment>
    <SafeAreaProvider>
      <StatusBar backgroundColor="#ee1515" />
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export {App};
