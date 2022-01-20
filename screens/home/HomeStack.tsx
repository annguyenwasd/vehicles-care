import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-paper';
import { HomeTab } from './HomeTab';
import { ListItemStack } from '../item-management/list/ListItemStack';
import { ListMotorbike } from '../motorbike-management/list/ListMotorbike';

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="HomeTab"
          component={HomeTab}
          options={({ navigation}) => ({
            title: 'Home',
            headerShown: false
          })}
        />
        <Stack.Screen
          name="ListItemStack"
          component={ListItemStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ListMotorbikeStack"
          component={ListMotorbike}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
