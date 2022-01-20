import * as React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import {
    Button,
    Dialog,
    Divider,
    List,
    Paragraph,
    Portal
} from 'react-native-paper';
import { View } from '../../../components/Themed';
import { useStorage } from '../../../hooks/useStorage';
import {
    ListRecordStackScreenProps, Record,
    RecordRecord, timeOptionMap
} from '../../../types';

export const ListRecord = (props: ListRecordStackScreenProps<'ListRecord'>) => {
  const {
    navigation: { navigate, addListener },
  } = props;
  const { record, setRecord, getRecord } = useStorage<RecordRecord>('@records', {
    defaultValue: {},
  });
  const selectedId = React.useRef<string | null>(null);

  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const records = Object.entries(record ?? {});

  const handleRemoveMotorbike = () => {
    if (selectedId.current) {
      const { [selectedId.current]: removed, ...otherMotorbikes } = record;
      setRecord(otherMotorbikes);
      selectedId.current = null;
      hideDialog();
    }
  };

  const handleGoToDetail = (selectedRecord: Record) => {
    navigate('CreateRecordStack', {
      // TODO: don't know why type error here
      params: { record: selectedRecord },
      screen: 'CreateRecord',
    });
  };

  React.useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      getRecord();
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <View style={styles.modal}>
        <ScrollView>
          {records.map(([id, record], index, list) => {
            const isNotLast = list.length - 1 !== index;
            let metadata: string | string[] = [];
            if (record.kmInterval.enabled)
              metadata.push(`${record.kmInterval.value} km`);
            if (record.timeInterval.enabled)
              metadata.push(
                `${record.timeInterval.value} ${
                  timeOptionMap[record.timeInterval.unit]
                }`
              );
            metadata = metadata.join(' / ');
            return (
              <View key={id}>
                <List.Record
                  title={record.name}
                  description={metadata}
                  onPress={() => handleGoToDetail(record)}
                  left={() => (
                    <Image style={styles.thumbnail} source={record?.icon} />
                  )}
                  right={() => (
                    <Button
                      icon="close"
                      onPress={() => {
                        setVisible(true);
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
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title onPressIn={() => {}} onPressOut={() => {}}>
            Remove Alert
          </Dialog.Title>
          <Dialog.Content>
            {/* // TODO: tell them how many records using it */}
            <Paragraph>Do you really want to remove this record?</Paragraph>
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
  modal: {},
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignRecords: 'center',
    marginBottom: 40,
  },
  motorbikeContainer: {
    flexDirection: 'row',
    alignRecords: 'center',
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
