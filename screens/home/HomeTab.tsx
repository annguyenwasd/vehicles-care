import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home';
import { Account } from './Account';

const Tab = createBottomTabNavigator();

interface HomeTabProps {}

export const HomeTab = (props: HomeTabProps) => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};


