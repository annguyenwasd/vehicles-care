import React, { Dispatch, SetStateAction } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { HelperText } from './HelperText';
import { ViewProps } from './Themed';

type Option = { label: string; value: any };

interface Props extends ViewProps {
  name: string;
  rules?: any;
  items: Option[];
  setItems?: Dispatch<SetStateAction<any>>;
}

export function FormSelect(props: Props) {
  const { name, rules, items, setItems = () => {}, style } = props;
  const {
    control,
    formState: { errors },
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
      <HelperText type="error" visible={!!errors[name]}>
        {errors[name]?.message ?? 'Something went wrong!!!'}
      </HelperText>
    </View>
  );
}
