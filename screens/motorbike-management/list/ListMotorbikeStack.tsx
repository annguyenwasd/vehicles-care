import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-paper';
import { CreateMotorbikeStack } from '../create/CreateMotorbikeStack';
import { ListMotorbike } from './ListMotorbike';

const Stack = createStackNavigator();

export const ListMotorbikeStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="ListMotorbike"
          component={ListMotorbike}
          options={({ navigation}) => ({
            title: 'Motorbikes',
            headerRight:()=> (
              <Button
                mode="text"
                onPress={() => navigation.navigate('CreateMotorbikeStack')}
              >
                {`Add`}
              </Button>
            ),
          })}
        />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="CreateMotorbikeStack"
          component={CreateMotorbikeStack}
          options={{
            headerShown: false,
          }}
        />
        </Stack.Group>
    </Stack.Navigator>
  );
};
