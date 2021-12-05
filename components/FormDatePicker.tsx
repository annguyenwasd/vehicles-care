import React from "react";
import { useController } from "react-hook-form";
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
  const { field: { value, ref, ...restField }, fieldState } = useController({ name, rules });

  return (
    <View style={style}>
      <DateTimePicker
        mode="date"
        display="default"
        value={value}
        {...restField}
        {...rest}
      />
      <HelperText type="error" visible={!!fieldState.error} onPressIn={noop} onPressOut={noop}>
        {fieldState.error?.message ?? 'Something went wrong!!!'}
      </HelperText>
    </View>
  );
}
