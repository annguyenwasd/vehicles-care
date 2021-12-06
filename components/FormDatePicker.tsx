import React from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { HelperText } from "react-native-paper";
import DateTimePicker, { AndroidNativeProps, IOSNativeProps, WindowsNativeProps } from "@react-native-community/datetimepicker";

type Props = IOSNativeProps | AndroidNativeProps | WindowsNativeProps | any;
type FormDatePickerProps = Omit<Props, 'value'> & {
  name: string;
  rules?: any;
}

const noop = () => { };

export function FormDatePicker(props: FormDatePickerProps) {
  const { name = 'date', rules, style, ...rest } = props;
  const { control, formState: { errors, ...x }, getValues } = useFormContext()

  return (
    <View style={style}>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            mode="date"
            display="default"
            onChange={(_, date:Date) => {
              onChange(date)
            }
            }
            value={new Date(value)}
            {...rest}
          />
        )}
      />
      <HelperText type="error" visible={!!errors[name]} onPressIn={noop} onPressOut={noop}>
        {errors[name]?.message ?? 'Something went wrong!!!'}
      </HelperText>
    </View>
  );
}
