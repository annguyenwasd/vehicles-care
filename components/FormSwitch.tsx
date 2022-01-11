import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { HelperText, Switch } from "react-native-paper";

interface Props {
  name: string;
  rules?: any;
}

const noop = () => { };

export function FormSwitch(props: Props) {
  const { name, rules, ...rest } = props;
  const { control, formState: { errors } } = useFormContext()

  return (
    <View>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <Switch
            onValueChange={onChange}
            value={value}
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
