import * as React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import {
  Button,
  Dialog,
  Divider,
  List,
  Paragraph,
  Portal,
} from 'react-native-paper';
import { View } from '../../../components/Themed';
import { useStorage } from '../../../hooks/useStorage';
import {
  Item,
  ItemRecord,
  ListItemStackScreenProps,
  timeOptionMap,
} from '../../../types';

export const ListItem = (props: ListItemStackScreenProps<'ListItem'>) => {
  const {
    navigation: { navigate, addListener },
  } = props;
  const { item, setItem, getItem } = useStorage<ItemRecord>('@items', {
    defaultValue: {},
  });
  const selectedId = React.useRef<string | null>(null);

  const [isWarinigModalOpen, setOpenWarningModal] = React.useState(false);

  const hideDialog = () => setOpenWarningModal(false);

  const items = Object.entries(item ?? {});

  const handleRemoveItem = () => {
    if (selectedId.current) {
      const { [selectedId.current]: removed, ...otherMotorbikes } = item;
      setItem(otherMotorbikes);
      selectedId.current = null;
      hideDialog();
    }
  };

  const handleGoToDetail = (selectedItem: Item) => {
    navigate('CreateItemStack', {
      params: { item: selectedItem },
      screen: 'CreateItem',
    });
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
        <ScrollView>
          {items.map(([id, item], index, list) => {
            const isNotLast = list.length - 1 !== index;
            let metadata: string | string[] = [];
            if (item.kmInterval.enabled)
              metadata.push(`${item.kmInterval.value} km`);
            if (item.timeInterval.enabled)
              metadata.push(
                `${item.timeInterval.value} ${
                  timeOptionMap[item.timeInterval.unit]
                }`
              );
            metadata = metadata.join(' / ');
            return (
              <View key={id}>
                <List.Item
                  title={item.name}
                  description={metadata}
                  onPress={() => handleGoToDetail(item)}
                  left={() => (
                    <Image style={styles.thumbnail} source={item?.icon} />
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
      </View>

      <Portal>
        <Dialog visible={isWarinigModalOpen} onDismiss={hideDialog}>
          <Dialog.Title onPressIn={() => {}} onPressOut={() => {}}>
            Remove Item
          </Dialog.Title>
          <Dialog.Content>
            {/* // TODO: tell them how many records using it */}
            <Paragraph>Do you really want to remove this item?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => hideDialog()}>Calcel</Button>
            <Button onPress={() => handleRemoveItem()}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  metadata: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});
