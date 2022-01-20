import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

export const IconImage = ({
  icon,
  onPress,
}: {
  icon: any;
  onPress: (icon: any) => void;
}) => (
  <TouchableOpacity onPress={() => onPress(icon)}>
    <Image source={icon} style={styles.icon} />
  </TouchableOpacity>
);

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
    marginTop: 10,
    borderRadius: 100,
    borderWidth: 1,
  },
});

export const iconStyles = styles;
