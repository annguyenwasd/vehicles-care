import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Button,
  Image,
  ImagePickerResult,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import * as ImagePicker from "expo-image-picker";

export default function TabOneScreen({
  navigation
}: RootTabScreenProps<"TabOne">) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [img, setImg] = React.useState<ImagePickerResult | null>(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImg(pickerResult);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Date:</Text>
        <DateTimePicker
          style={styles.flex1}
          value={date}
          mode="date"
          display="calendar"
          onChange={onChange}
        />
      </View>

      {img && <Image source={img} style={{ width: 200, height: 200 }} />}
      <View style={styles.container}>
        <Text>Username:</Text>
        <TextInput defaultValue="Hi" style={styles.flex1} />
      </View>

      <TouchableOpacity onPress={openImagePickerAsync}>
        <Text>Pick a photo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding:20
  },
  flex1: {
    flex: 1,
    marginLeft: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%"
  }
});
