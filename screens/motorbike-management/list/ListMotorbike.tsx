import * as React from 'react';
import {
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  FlatList,
  ModalProps,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { View, Text } from '../../../components/Themed';
import { Button, Caption, Title } from 'react-native-paper';
import { useStorage } from '../../../hooks/useStorage';
import { CreateMotorbike } from '../create/CreateMotorbike';
import { Motorbike, MotorbikeMap } from '../../../types';
import moment from 'moment';

interface Props extends ModalProps {}

export const ListMotorbike = (props: Props) => {
  const { onRequestClose = () => {} } = props;
  const { item, setItem, getItem } = useStorage<MotorbikeMap>('@motorbikes', {
    defaultValue: {},
  });

  const motorbikes = Object.entries(item ?? {});

  const [isModalVisible, setModalVisible] = React.useState(false);

  const handleShowModal = () => setModalVisible(true);
  const handleCloseModal = () => {
    setModalVisible(false);
    getItem();
  };

  const handleRemoveMotorbike = (id: string) => {
    const { [id]: removed, ...otherMotorbikes } = item;
    setItem(otherMotorbikes);
  };

  const handleGoToDetail = (motor: Motorbike) => {
    console.log('go to detail', motor.name);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        presentationStyle="formSheet"
        transparent={false}
        {...props}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Button onPress={handleCloseModal}>Close</Button>
            <Title>List Motorbike</Title>
            <Button onPress={() => {}}>Edit</Button>
          </View>

          {motorbikes.map(([id, _motor]) => {
            const motor = _motor as Motorbike;
            return (
              <TouchableOpacity
                key={id}
                style={styles.motorbikeContainer}
                onPress={() => handleGoToDetail(motor)}
              >
                <Image
                  style={styles.thumbnail}
                  source={motor?.thumbnail ?? require('../create/scooter.png')}
                />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{motor.name}</Text>
                  {motor.plateNumber && (
                    <Button icon="numeric" style={styles.info}>
                      <Caption>{motor.plateNumber}</Caption>
                    </Button>
                  )}
                  {motor.purchaseDate && (
                    <Button icon="calendar" style={styles.info}>
                      <Caption>{`Purchased on: `}</Caption>
                      <Caption>{moment(motor.purchaseDate).format('DD-MM-YYYY')}</Caption>
                    </Button>
                  )}
                </View>
                <View style={styles.removeContainer}>
                  <Button
                    icon="close"
                    onPress={() => handleRemoveMotorbike(id)}
                  >
                    {''}
                  </Button>
                </View>
              </TouchableOpacity>
            );
          })}

          <Button mode="text" icon="plus" onPress={handleShowModal}>
            Add Motorbike
          </Button>
          <CreateMotorbike
            visible={isModalVisible}
            onRequestClose={handleCloseModal}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignItems: 'stretch',
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  motorbikeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    backgroundColor: 'lightgray',
  },
  removeContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    backgroundColor: 'lightgray',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
  },
  infoContainer: {
    backgroundColor: 'lightgray',
  },
  info:{
    alignSelf:'flex-start'
  }
});
