import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconImage } from '../../../components/IconImage';
import { CreateMotorbikeStackScreenProps } from '../../../types';

const icons = [
  require('./icons/motor-1.jpg'),
  require('./icons/motor-2.jpg'),
  require('./icons/motor-3.jpg'),
  require('./icons/motor-4.jpg'),
  require('./icons/motor-5.jpg'),
  require('./icons/motor-6.jpg'),
  require('./icons/motor-7.jpg'),
  require('./icons/motor-8.jpg'),
  require('./icons/motor-9.jpg'),
  require('./icons/motor-10.jpg'),
  require('./icons/motor-11.jpg'),
  require('./icons/motor-12.jpg'),
  require('./icons/motor-13.jpg'),
  require('./icons/motor-14.jpg'),
  require('./icons/motor-15.jpg'),
  require('./icons/motor-16.jpg'),
  require('./icons/motor-17.jpg'),
  require('./icons/motor-18.jpg'),
  require('./icons/motor-19.jpg'),
  require('./icons/motor-20.jpg'),
  require('./icons/motor-21.jpg'),
  require('./icons/motor-22.jpg'),
  require('./icons/motor-23.jpg'),
  require('./icons/motor-24.jpg'),
  require('./icons/motor-25.jpg'),
  require('./icons/motor-26.jpg'),
  require('./icons/motor-27.jpg'),
  require('./icons/motor-28.jpg'),
  require('./icons/motor-29.jpg'),
  require('./icons/motor-30.jpg'),
  require('./icons/motor-31.jpg'),
  require('./icons/motor-32.jpg'),
  require('./icons/motor-33.jpg'),
  require('./icons/motor-34.jpg'),
  require('./icons/motor-35.jpg'),
];

export const Icons = ({
  navigation: { navigate },
  route,
}: CreateMotorbikeStackScreenProps<'Icons'>) => {

  const handleSelect = (icon: any) => {
    navigate('CreateMotorbike', { icon, motorbike: route.params?.motorbike });
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
  },
  icon: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 100,
    borderWidth: 1,
    padding: 15,
    backgroundColor: 'blue'
  },
});

export const iconStyles = styles;
