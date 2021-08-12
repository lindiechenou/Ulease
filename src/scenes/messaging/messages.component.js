/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import {message} from './conversation-list/message.tsx';
import {MapScreen} from '../map.component';

import {createStackNavigator} from '@react-navigation/stack';
import {chat1} from './chat-1/chat1';
export const MessagesScreen = ({navigation}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="message" component={message} />
      <Stack.Screen name="chat1" component={chat1} />
    </Stack.Navigator>
  );
};
