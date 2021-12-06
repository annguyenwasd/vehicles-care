import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

interface Props extends Omit<TextInputProps, 'theme'> {
  name: string;
  rules?: any;
}

const noop = () => { };

export function FormInput(props: Props) {
  const { name, rules, ...rest } = props;
  const { control, formState: { errors } } = useFormContext()

  return (
    <View>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            autoComplete={false}
            onBlur={onBlur}
            onChangeText={onChange}
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
