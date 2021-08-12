import 'react-native-gesture-handler';
import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './navigations/navigation.component';
import {default as mapping} from '../mapping.json';
import { MaterialIconsPack} from '../material.icons';
import { AuthProvider } from './navigations/AuthProvider';
import {UserProvider} from './navigations/UserProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { default as theme } from '../custom-theme.json'; // <-- Import app theme
import { SubleaseProvider } from './navigations/SubleaseProvider';

export default () => (
  <>
    <IconRegistry icons={[EvaIconsPack, MaterialIconsPack]} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
      <AuthProvider>
        <UserProvider>
          <SubleaseProvider>
            <SafeAreaProvider>
              <AppNavigator />
            </SafeAreaProvider>
          </SubleaseProvider>
        </UserProvider>
      </AuthProvider>
    </ApplicationProvider>
  </>
);
