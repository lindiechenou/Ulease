/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Divider, Layout, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import {MapScreen} from './map.component'
import {ListScreen} from './listScreen/index'
import {SubletScreen} from "./subletScreen/index";
import { createStackNavigator } from '@react-navigation/stack';
import { ListScreenParamList } from 'types';
import { StackNavigationProp } from '@react-navigation/stack';
import {BottomTabParamList} from 'types'

export const SearchScreen = () => {
  const Stack = createStackNavigator<ListScreenParamList>();
  
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Sublet" component={SubletScreen} />
      </Stack.Navigator>
    );
}
