import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateItem } from './CreateItem';
import { Icons } from './Icons';
import { CreateItemStackParamList } from '../../../types';

const Stack = createStackNavigator<CreateItemStackParamList>();

export const CreateItemStack = () => {
  return (
    <Stack.Navigator initialRouteName="CreateItem">
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="CreateItem"
          component={CreateItem}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="Icons" component={Icons} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
