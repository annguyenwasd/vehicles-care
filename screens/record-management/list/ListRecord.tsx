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
import { ItemRecord, Motorbike, MotorbikeRecord } from '../../../types';
import moment from 'moment';

interface Props extends ModalProps {}

export const ListRecord = (props: Props) => {
  const {
    onRequestClose = () => {},
    navigation: { navigate, goBack, addListener },
  } = props;
  const { items, setItem, getItem } = useStorage<ItemRecord>('@items', {
    defaultValue: {},
  });

  const items = Object.entries(items ?? {});

  const [isModalVisible, setModalVisible] = React.useState(false);

  const handleShowModal = () => navigate('CreateItemStack');
  const handleCloseModal = () => {
    goBack();
    getItem();
  };

  const handleRemoveMotorbike = (id: string) => {
    const { [id]: removed, ...otherMotorbikes } = items;
    setItem(otherMotorbikes);
  };

  const handleGoToDetail = (motor: Motorbike) => {
    navigate('Icons');
  };

  React.useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      getItem();
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Button onPress={handleCloseModal}>Close</Button>
          <Title>List Item</Title>
          <Button onPress={() => {}}>Edit</Button>
        </View>

        <ScrollView style={{ maxHeight: '83%' }}>
          {items.map(([id, _motor]) => {
            const motor = _motor as Motorbike;
            return (
              <TouchableOpacity
                key={id}
                style={styles.motorbikeContainer}
                onPress={() => handleGoToDetail(motor)}
              >
                <Image style={styles.thumbnail} source={motor?.icon} />
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{motor.name}</Text>
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
        </ScrollView>

        <Button mode="text" icon="plus" onPress={handleShowModal}>
          Add Item
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {},
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
  info: {
    alignSelf: 'flex-start',
  },
});
