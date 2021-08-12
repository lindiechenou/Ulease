import React from 'react';
import {
  Button,
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';
import {ForgotPasswordScreen} from './forgot';
import {LoginScreen} from './login';
import {SignUpScreen} from './signUp';
import {ResetScreen} from './reset';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthNavigationParamList} from '../../../types'


export const AuthNavigation = () => {
  const Stack = createStackNavigator<AuthNavigationParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
      <Stack.Screen name="SignUP" component={SignUpScreen} />
      <Stack.Screen name="Reset" component={ResetScreen} />
    </Stack.Navigator>
  );
};
