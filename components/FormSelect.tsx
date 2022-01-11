import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { HelperText } from './HelperText';

interface Props {
  name: string;
  rules?: any;
}

const noop = () => {};

export function FormSelect(props: Props) {
  const { name, rules, items, setItems = () => {}, style, ...rest } = props;
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();
  const [open, setOpen] = React.useState(false);

  return (
    <View style={style}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={(val) => {
              onChange(val());
            }}
            setItems={setItems}
          />
        )}
      />
      <HelperText
        type="error"
        visible={!!errors[name]}
      >
        {errors[name]?.message ?? 'Something went wrong!!!'}
      </HelperText>
    </View>
  );
}
