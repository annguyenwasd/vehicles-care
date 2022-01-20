import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconImage } from '../../../components/IconImage';
import { CreateItemStackScreenProps } from '../../../types';

const icons = [
  require('./icons/part-1.png'),
  require('./icons/part-2.png'),
  require('./icons/part-3.png'),
  require('./icons/part-4.png'),
  require('./icons/part-5.png'),
  require('./icons/part-6.png'),
  require('./icons/part-7.png'),
  require('./icons/part-8.png'),
  require('./icons/part-9.png'),
  require('./icons/part-10.png'),
  require('./icons/part-11.png'),
  require('./icons/part-12.png'),
  require('./icons/part-13.png'),
  require('./icons/part-14.png'),
  require('./icons/part-15.png'),
  require('./icons/part-16.png'),
  require('./icons/part-17.png'),
  require('./icons/part-18.png'),
  require('./icons/part-19.png'),
  require('./icons/part-20.png'),
  require('./icons/part-21.png'),
  require('./icons/part-22.png'),
  require('./icons/part-23.png'),
  require('./icons/part-24.png'),
  require('./icons/part-25.png'),
  require('./icons/part-26.png'),
  require('./icons/part-27.png'),
  require('./icons/part-28.png'),
  require('./icons/part-29.png'),
  require('./icons/part-30.png'),
  require('./icons/part-31.png'),
  require('./icons/part-32.png'),
  require('./icons/part-33.png'),
  require('./icons/part-34.png'),
  require('./icons/part-35.png'),
  require('./icons/part-36.png'),
];

export const Icons = ({
  navigation: { navigate },
  route,
}: CreateItemStackScreenProps<'Icons'>) => {
  const handleSelect = (icon: any) => {
    navigate('CreateItem', { icon, item: route.params?.item });
  };
  return (
    <View style={styles.container}>
      <IconImage onPress={handleSelect} icon={icons[0]} />
      <IconImage onPress={handleSelect} icon={icons[1]} />
      <IconImage onPress={handleSelect} icon={icons[2]} />
      <IconImage onPress={handleSelect} icon={icons[3]} />
      <IconImage onPress={handleSelect} icon={icons[4]} />
      <IconImage onPress={handleSelect} icon={icons[5]} />
      <IconImage onPress={handleSelect} icon={icons[6]} />
      <IconImage onPress={handleSelect} icon={icons[7]} />
      <IconImage onPress={handleSelect} icon={icons[8]} />
      <IconImage onPress={handleSelect} icon={icons[9]} />
      <IconImage onPress={handleSelect} icon={icons[10]} />
      <IconImage onPress={handleSelect} icon={icons[11]} />
      <IconImage onPress={handleSelect} icon={icons[12]} />
      <IconImage onPress={handleSelect} icon={icons[13]} />
      <IconImage onPress={handleSelect} icon={icons[14]} />
      <IconImage onPress={handleSelect} icon={icons[15]} />
      <IconImage onPress={handleSelect} icon={icons[16]} />
      <IconImage onPress={handleSelect} icon={icons[17]} />
      <IconImage onPress={handleSelect} icon={icons[18]} />
      <IconImage onPress={handleSelect} icon={icons[19]} />
      <IconImage onPress={handleSelect} icon={icons[20]} />
      <IconImage onPress={handleSelect} icon={icons[21]} />
      <IconImage onPress={handleSelect} icon={icons[22]} />
      <IconImage onPress={handleSelect} icon={icons[23]} />
      <IconImage onPress={handleSelect} icon={icons[24]} />
      <IconImage onPress={handleSelect} icon={icons[25]} />
      <IconImage onPress={handleSelect} icon={icons[26]} />
      <IconImage onPress={handleSelect} icon={icons[27]} />
      <IconImage onPress={handleSelect} icon={icons[28]} />
      <IconImage onPress={handleSelect} icon={icons[29]} />
      <IconImage onPress={handleSelect} icon={icons[30]} />
      <IconImage onPress={handleSelect} icon={icons[31]} />
      <IconImage onPress={handleSelect} icon={icons[32]} />
      <IconImage onPress={handleSelect} icon={icons[33]} />
      <IconImage onPress={handleSelect} icon={icons[34]} />
      <IconImage onPress={handleSelect} icon={icons[35]} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  }
});
