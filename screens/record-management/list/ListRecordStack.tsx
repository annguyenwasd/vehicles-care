import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem } from './ListItem';
import { Icons } from '../create/Icons';
import { CreateItem } from '../create/CreateItem';
import { CreateItemStack } from '../create/CreateItemStack';

const Stack = createStackNavigator();

export const ListItemStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="ListItem"
          component={ListItem}
          options={{
            title: 'List Item',
          }}
        />
        <Stack.Screen name="CreateItemStack" component={CreateItemStack} options={{
          headerShown: false}} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
