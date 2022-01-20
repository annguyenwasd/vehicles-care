import * as React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { FormDatePicker } from '../../../components/FormDatePicker';
import { FormInput } from '../../../components/FormInput';
import { iconStyles } from '../../../components/IconImage';
import { Text, View } from '../../../components/Themed';
import { useStorage } from '../../../hooks/useStorage';
import { CreateMotorbikeStackScreenProps, Motorbike } from '../../../types';

export const CreateMotorbike = (
  props: CreateMotorbikeStackScreenProps<'CreateMotorbike'>
) => {
  const { route, navigation } = props;

  const isEdit = route.params?.motorbike;

  const methods = useForm<Motorbike>({
    defaultValues: isEdit ? route.params?.motorbike : {
      icon: require('./icons/motor-1.jpg'),
      name: '',
      plateNumber: '',
      purchaseDate: new Date(),
    },
  });

  const { handleSubmit, control, setValue } = methods;
  const { item, setItem } = useStorage('@motorbikes', {
    defaultValue: {},
  });

  React.useEffect(() => {
    if (route?.params?.icon) setValue('icon', route.params.icon);
  }, [route?.params?.icon]);

  const onSubmit = (data: Motorbike) => {
    let payload;
    if (isEdit && route.params?.motorbike?.id) {
      payload = Object.assign(item, {
        [route.params.motorbike.id]: { ...route.params.motorbike, ...data },
      });
    } else {
      const id = Date.now().toString();
      payload = Object.assign(item, { [id]: { id, ...data } });
    }

    setItem(payload).then(navigation.goBack);
  };

  const handleNavigatePickIcon = () => {
    navigation.navigate('Icons', {
      motorbike: route.params?.motorbike,
    });
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Button onPress={() => navigation.goBack()}>Cancel</Button>
          <Title>{isEdit ? 'Edit Motorbike' : 'Create Motorbike'}</Title>
          <Button onPress={handleSubmit(onSubmit)}>Save</Button>
        </View>

        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={{ flex: 2}}>
            <Controller
              name="icon"
              control={control}
              rules={{ required: 'Icon is required' }}
              render={({ field: { value } }) => (
                <TouchableOpacity onPress={handleNavigatePickIcon}>
                  <Image style={iconStyles.icon} source={value} />
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={{ flex: 8 }}>
            <FormInput
              name="name"
              placeholder="Motorbike name"
              label="Name"
              rules={{ required: 'Name is required' }}
            />
          </View>
        </View>
        <FormInput name="plateNumber" placeholder="Plate number" label="Plate No." />
        <View style={styles.purchaseDateContainer}>
          <Text style={styles.purchaseDateText}>Purchase date:</Text>
          <FormDatePicker name="purchaseDate" style={styles.purchaseDate} />
        </View>
      </View>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 20,
    alignItems: 'stretch',
  flex: 1
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  purchaseDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  purchaseDate: { width: 200 },
  purchaseDateText: { marginTop: 10 },
});
