/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Divider, Layout, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import {MapScreen} from './map.component'
import {SavedListScreen} from './savedScreen/index'
import {SubletScreen} from "./subletScreen/index";
import { createStackNavigator } from '@react-navigation/stack';
import { SavedScreenParamList } from 'types';

export const SavedScreen = ({navigation}) => {
  const Stack = createStackNavigator<SavedScreenParamList>();
  
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Saved" component={SavedListScreen} />
        <Stack.Screen name="Sublet" component={SubletScreen} />
      </Stack.Navigator>
    );
}