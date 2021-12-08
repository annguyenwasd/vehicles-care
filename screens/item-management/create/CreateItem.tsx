import * as React from 'react';
import { Image, StyleSheet, ModalProps, TouchableOpacity } from 'react-native';
import { View } from '../../../components/Themed';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { FormInput } from '../../../components/FormInput';
import { Button, Title } from 'react-native-paper';
import { useStorage } from '../../../hooks/useStorage';
import { Item, Motorbike } from '../../../types';

interface Props extends ModalProps {}

export const CreateItem = (props: Props) => {
  const { onRequestClose = () => {}, navigation, route } = props;
  const methods = useForm<Item>({
    defaultValues: {
      name: '',
      icon: require('./icons/part-30.png'),
    },
  });
  const { handleSubmit, control, setValue } = methods;
  const { item, setItem } = useStorage('@items', {
    defaultValue: {},
  });

  React.useEffect(() => {
    if (route?.params?.icon) setValue('icon', route.params.icon);
  }, [route?.params?.icon]);

  const onSubmit = (data: Motorbike) => {
    const id = Date.now().toString();
    const payload = Object.assign(item, { [id]: { id, ...data } });

    setItem(payload).then(() => {
      onRequestClose();
    });
  };

  const handleDismiss = () => {
    methods.reset();
  };

  const handleNavigatePickIcon = () => {
    navigation.navigate('Icons');
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Button onPress={onRequestClose}>Cancel</Button>
          <Title>Create Item</Title>
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
              placeholder="Item name"
              rules={{ required: 'Name is required' }}
            />
          </View>
        </View>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
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
});
