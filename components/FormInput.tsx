import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";
import { HelperText } from "./HelperText";

interface Props extends Omit<TextInputProps, 'theme'> {
  name: string;
  rules?: any;
}

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
            error={errors[name]}
            value={value}
            {...rest}
          />
        )}
      />
      <HelperText type="error" visible={!!errors[name]}>
        {errors[name]?.message ?? 'Something went wrong!!!'}
      </HelperText>
    </View>
  );
}
