import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateMotorbike } from './CreateMotorbike';
import { Icons } from './Icons';

const Stack = createStackNavigator();

export const CreateMotorbikeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="CreateMotorbike"
          component={CreateMotorbike}
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
