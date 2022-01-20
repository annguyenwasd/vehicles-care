import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ListRecord } from './ListRecord';
import { CreateRecordStack } from '../create/CreateRecordStack';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();

export const ListRecordStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name="ListRecord"
          component={ListRecord}
          options={({ navigation}) => ({
            title: 'Records',
            headerRight:()=> (
              <Button
                mode="text"
                onPress={() => navigation.navigate('CreateRecordStack')}
              >
                {`Add`}
              </Button>
            ),
          })}
        />
        <Stack.Screen
          name="CreateRecordStack"
          component={CreateRecordStack}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
