import * as React from 'react';
import { Image, StyleSheet, ModalProps, TouchableOpacity } from 'react-native';
import { View } from '../../../components/Themed';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { FormInput } from '../../../components/FormInput';
import { Button, TextInput, Title } from 'react-native-paper';
import { useStorage } from '../../../hooks/useStorage';
import { CreateItemStackParamList, Item, Motorbike } from '../../../types';
import { FormSwitch } from '../../../components/FormSwitch';
import { FormSelect } from '../../../components/FormSelect';
import { HelperText } from '../../../components/HelperText';
import { StackScreenProps } from '@react-navigation/stack';

interface Props
  extends ModalProps,
    StackScreenProps<CreateItemStackParamList, 'CreateItem'> {}

const timeOptions = [
  { label: 'Days', value: 'd' },
  { label: 'Months', value: 'm' },
  { label: 'Years', value: 'y' },
];

export const CreateItem = (props: Props) => {
  const { onRequestClose = () => {}, navigation, route } = props;
  const isEdit = route.params?.item;

  const methods = useForm<Item>({
    defaultValues: isEdit
      ? route.params?.item
      : {
          name: '',
          icon: require('./icons/part-30.png'),
          timeInterval: {
            enabled: false,
            value: '0',
            unit: 'y',
          },
          kmInterval: {
            enabled: true,
            value: '0',
          },
        },
  });

  const { handleSubmit, control, setValue, watch } = methods;
  const { item, setItem } = useStorage('@items', {
    defaultValue: {},
  });

  const [timeIntervalEnabled, kmIntervalEnabled] = watch([
    'timeInterval.enabled',
    'kmInterval.enabled',
  ]);

  React.useEffect(() => {
    if (route?.params?.icon) setValue('icon', route.params.icon);
  }, [route?.params?.icon]);

  const onSubmit = (data: Motorbike) => {
    const id = Date.now().toString();
    let payload;
    if (isEdit) {
      payload = Object.assign(item, {
        [route.params.item.id]: { ...route.params.item, ...data },
      });
    } else {
      payload = Object.assign(item, { [id]: { id, ...data } });
    }

    setItem(payload).then(() => {
      onRequestClose();
      navigation.goBack();
    });
  };

  const handleDismiss = () => {
    methods.reset();
    navigation.goBack();
  };

  const handleNavigatePickIcon = () => {
    navigation.navigate('Icons');
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Button onPress={handleDismiss}>Cancel</Button>
          <Title>{isEdit ? 'Edit Item' : 'Create Item'}</Title>
          <Button onPress={handleSubmit(onSubmit)}>Save</Button>
        </View>

        <View style={styles.nameContainer}>
          <Controller
            name="icon"
            control={control}
            rules={{ required: 'Icon is required' }}
            render={({ field: { value } }) => (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={handleNavigatePickIcon}
              >
                <Image style={styles.icon} source={value} />
              </TouchableOpacity>
            )}
          />
          <View style={styles.name}>
            <FormInput
              name="name"
              label="Name"
              placeholder="E.g: Oil"
              rules={{ required: 'Name is required' }}
            />
          </View>
        </View>
        <View style={styles.switchContainer}>
          <HelperText type="info" style={styles.switchLabel}>
            Km Interval
          </HelperText>
          <FormSwitch name="kmInterval.enabled" />
        </View>
        {kmIntervalEnabled && (
          <FormInput
            name="kmInterval.value"
            placeholder="E.g: 1500"
            keyboardType="number-pad"
            right={<TextInput.Affix text="km" />}
            rules={{ required: 'Km is required' }}
          />
        )}
        <View style={styles.switchContainer}>
          <HelperText type="info" style={styles.switchLabel}>
            Time Interval
          </HelperText>
          <FormSwitch name="timeInterval.enabled" />
        </View>
        {timeIntervalEnabled && (
          <View style={styles.timeIntervalContainer}>
            <FormInput
              style={styles.timeIntervalInput}
              name="timeInterval.value"
              placeholder="E.g: 2 months"
              keyboardType="number-pad"
              rules={{ required: 'Time is required' }}
            />
            <FormSelect
              name="timeInterval.unit"
              items={timeOptions}
              style={styles.timeIntervalOptions}
            />
          </View>
        )}
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  switchLabel: { marginTop: 4 },
  switchContainer: {
    flexDirection: 'row',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: { flex: 1, marginLeft: 20 },
  iconContainer: {
    width: 50,
    height: 50,
  },
  icon: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
  },
  modal: {
    padding: 20,
    alignItems: 'stretch',
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  timeIntervalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIntervalOptions: {
    marginTop: 15,
    flexShrink: 1,
    marginLeft: 20,
  },
  timeIntervalInput: {
    flexShrink: 0,
  },
});
