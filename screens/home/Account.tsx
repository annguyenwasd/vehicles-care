import * as React from 'react';
import { View } from 'react-native';
import { Divider, List } from 'react-native-paper';

interface AccountProps {}

export const Account = (props: AccountProps) => {
  const { navigation } = props;
  return (
    <View>
      <List.Item
        title="Items"
        onPress={() => navigation.navigate('ListItemStack')}
      />
      <Divider />
      <List.Item
        title="Motorbikes"
        onPress={() => navigation.navigate('ListMotorbikeStack')}
      />
    </View>
  );
};
