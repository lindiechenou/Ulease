import React from 'react';

import {ProfileScreen} from '../scenes/profileScreen'
import {EditSubletScreen} from '../scenes/editSubletScreen'
import {SubletScreen} from '../scenes/subletScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreenParamList } from 'types';

export const ProfileNavigation = () => {
  const Stack = createStackNavigator<ProfileScreenParamList>();
  
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditSublet" component={EditSubletScreen} />
        <Stack.Screen name="Sublet" component={SubletScreen} />
      </Stack.Navigator>
    );
}