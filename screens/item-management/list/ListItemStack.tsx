import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem } from './ListItem';
import { CreateItemStack } from '../create/CreateItemStack';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();

export const ListItemStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="ListItem"
          component={ListItem}
          options={({ navigation}) => ({
            title: 'Items',
            headerRight:()=> (
              <Button
                mode="text"
                onPress={() => navigation.navigate('CreateItemStack')}
              >
                {`Add`}
              </Button>
            ),
          })}
        />
        <Stack.Screen
          name="CreateItemStack"
          component={CreateItemStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
