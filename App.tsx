import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import { CreateMotorbike } from './screens/motorbike-management/create/CreateMotorbike';
import { ListMotorbike } from './screens/motorbike-management/list/ListMotorbike';
import { CreateRecord } from './screens/record-management/create/CreateRecord';
import { CreateItem } from './screens/item-management/create/CreateItem';
import { NavigationContainer } from '@react-navigation/native';
import { CreateItemStack } from './screens/item-management/create/CreateItemStack';
import { ListItem } from './screens/item-management/list/ListItem';
import { ListItemStack } from './screens/item-management/list/ListItemStack';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory'

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <PaperProvider>
          <SafeAreaProvider>
            <ListItemStack />
          </SafeAreaProvider>
        </PaperProvider>
      </NavigationContainer>
    );
  }
}
