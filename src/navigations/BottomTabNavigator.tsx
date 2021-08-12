import React from 'react';
import {createBottomTabNavigator, BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
  Text,
} from '@ui-kitten/components';
import {createStackNavigator} from '@react-navigation/stack';
import {
  SavedIcon,
  MessagesIcon,
  ProfileIcon,
  SearchIcon,
} from '../components/icons';

import {SearchScreen} from '../scenes/search.component';
import {MessagesScreen} from '../scenes/messaging/messages.component'
import {ProfileNavigation} from './Profile.navigation'
import {SavedScreen} from '../scenes/saved.component'
import { StyleSheet, ImageProps} from 'react-native';
import { BottomTabParamList} from 'types';

const {Navigator, Screen} = createBottomTabNavigator<BottomTabParamList>();

// <BottomNavigationTab title="Messages" icon={MessagesIcon} />
//<Screen name="Messages" component={MessagesScreen} />
const BottomTabBar = ({navigation, state}:BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Search" icon={SearchIcon} />

    <BottomNavigationTab title="Saved" icon={SavedIcon} />

   

    <BottomNavigationTab title="Profile" icon={ProfileIcon} />
  </BottomNavigation>
);

export default function BottomTabNavigator() {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen name="Search" component={SearchScreen} />
      <Screen name="Saved" component={SavedScreen} />
      
      <Screen name="Profile" component={ProfileNavigation} />
    </Navigator>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});

