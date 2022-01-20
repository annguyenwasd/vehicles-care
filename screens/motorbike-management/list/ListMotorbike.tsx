import moment from 'moment';
import * as React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { Button, Dialog, Divider, List, Paragraph, Portal } from 'react-native-paper';
import { View } from '../../../components/Themed';
import { useStorage } from '../../../hooks/useStorage';
import {
    ListMotorbikeStackScreenProps,
    Motorbike,
    MotorbikeRecord
} from '../../../types';

export const ListMotorbike = (
  props: ListMotorbikeStackScreenProps<'ListMotorbike'>
) => {
  const {
    navigation: { navigate, addListener },
  } = props;

  const { item, setItem, getItem } = useStorage<MotorbikeRecord>(
    '@motorbikes',
    {
      defaultValue: {},
    }
  );

  const selectedId = React.useRef<string | null>(null);
  const [isWarinigModalOpen, setOpenWarningModal] = React.useState(false);

  const motorbikes = Object.entries(item ?? {});

  React.useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      getItem();
    });

    return unsubscribe;
  }, []);

  const handleGoToDetail = (motor: Motorbike) => {
    navigate('CreateMotorbikeStack', {
      // TODO: don't know why type error here
      params: { motorbike: motor },
      screen: 'CreateMotorbike',
    });
  };

  const hideDialog = () => setOpenWarningModal(false);

  const handleRemoveMotorbike = () => {
    if (selectedId.current) {
      const { [selectedId.current]: removed, ...otherMotorbikes } = item;
      setItem(otherMotorbikes);
      selectedId.current = null;
      hideDialog();
    }
  };


  return (
    <View style={styles.modal}>
      <ScrollView>
        {motorbikes.map(([id, motor], index, list) => {
          const isNotLast = list.length - 1 !== index;
          let metadata: string | string[] = [];
          if (motor.plateNumber) metadata.push(`No.: ${motor.plateNumber}`);
          if (motor.purchaseDate)
            metadata.push(`Bought on: ${moment(motor.purchaseDate).format('DD-MM-YYYY')}`);
          metadata = metadata.join('\n');
          return (
            <View key={id}>
              <List.Item
                title={motor.name}
                description={metadata}
                onPress={() => handleGoToDetail(motor)}
                left={() => (
                  <Image style={styles.thumbnail} source={motor?.icon} />
                )}
                right={() => (
                  <Button
                    icon="close"
                    onPress={() => {
                      setOpenWarningModal(true);
                      selectedId.current = id;
                    }}
                    style={{ marginVertical: 15 }}
                  >
                    {''}
                  </Button>
                )}
              />
              {isNotLast && <Divider />}
            </View>
          );
        })}
      </ScrollView>
      <Portal>
        <Dialog visible={isWarinigModalOpen} onDismiss={hideDialog}>
          <Dialog.Title onPressIn={() => {}} onPressOut={() => {}}>
            Remove Motorbike
          </Dialog.Title>
          <Dialog.Content>
            {/* // TODO: tell them how many records using it */}
            <Paragraph>Do you really want to remove this motorbike?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Calcel</Button>
            <Button onPress={() => handleRemoveMotorbike()}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  info: {
    alignSelf: 'flex-start',
  },
});
