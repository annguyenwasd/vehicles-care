import React, { ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";
import { TouchableOpacity, View, ViewProps, Image, ImageSourcePropType, StyleSheet } from "react-native";
import { HelperText } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

interface Props extends ViewProps {
  name: string;
  rules?: any;
  placeholder?: ReactNode
}

const noop = () => { };

export function FormPhotoPicker(props: Props) {
  const { name = 'photo', rules, style, placeholder = null } = props;
  const { field: { value }, fieldState } = useController({ name, rules });
  const {setValue} = useFormContext()

  const handlePickPhoto = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
   setValue(name, pickerResult) 
  };

  return (
    <View>

      <TouchableOpacity onPress={handlePickPhoto}>
        {value ? (
          <Image
            style={styles.photo}
            source={value as ImageSourcePropType}
          />
        ) : (
          <View style={styles.thumbnailContainer}>
            {placeholder}
            <HelperText type="info" visible onPressIn={noop} onPressOut={noop}>Pick a photo</HelperText>
          </View>
        )}

      </TouchableOpacity>
      <HelperText type="error" visible={!!fieldState.error} onPressIn={noop} onPressOut={noop}>
        {fieldState.error?.message ?? 'Something went wrong!!!'}
      </HelperText>
    </View>
  );
}

const styles = StyleSheet.create({
  thumbnailContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  photo: {
    width: 200,
    height: 200
  },
});
