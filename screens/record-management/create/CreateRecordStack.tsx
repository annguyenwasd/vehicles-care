import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateItem } from './CreateItem';
import { Icons } from './Icons';

const Stack = createStackNavigator();

export const CreateItemStack = () => {
  return (
    <Stack.Navigator initialRouteName="CreateItem">
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="CreateItem"
          component={CreateItem}
          options={{
            title: 'Create Item',
          }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="Icons" component={Icons} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
