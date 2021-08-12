import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer,} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import {AuthNavigation} from '../scenes/authScreens/auth.component';
import {AuthContext} from './AuthProvider'
import {Text} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView } from 'react-native-safe-area-context';
//<HomeNavigator/>?

const linking = {
  prefixes: ['https://uleasehousing.com', 'uleasehousing://'],
  config: {
    screens: {
      Reset:{
        path: '/password-reset/key/:key',
        parse: {
          key: String,
        },
      }
    },
  },
};

export const AppNavigator = () => {
  const {state, dispatch} = useContext(AuthContext);
   //check whether a user is logged in or not

   //TODO
   const [loading, setLoading] = useState(true);
   const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      let email;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        email = await AsyncStorage.getItem('email');
      } catch (e) {

        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken, email: email });
    };

    bootstrapAsync();
  }, []);

  return (
    // {state.userToken == null ? <AuthNavigation/> : <RootNavigator />}
    
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      {state.userToken == null ? <AuthNavigation/> : <RootNavigator />}
    </NavigationContainer>
  

  );
};

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <SafeAreaView style={{ flex: 1}}>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
    </Stack.Navigator>
    </SafeAreaView>
     
  );
}
