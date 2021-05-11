import React from 'react';
import {NewUserStack} from './NewUserStack';
import {SignedStack} from './SignedStack';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const AppNavigator = () => {
  const [isSignedIn, setSignedIn] = React.useState(false);

  const onAuthStateChanged = (u) => {
    setSignedIn(u && u.uid);
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <NavigationContainer>
      {!isSignedIn ? <NewUserStack /> : <SignedStack />}
    </NavigationContainer>
  );
};

export {AppNavigator};
