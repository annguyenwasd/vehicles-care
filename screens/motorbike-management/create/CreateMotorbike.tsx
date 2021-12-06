import * as React from "react";
import { Image, StyleSheet, Modal } from "react-native";
import { Text, View } from "../../../components/Themed";
import * as ImagePicker from "expo-image-picker";
import { useForm, FormProvider } from "react-hook-form";
import { FormInput } from "../../../components/FormInput";
import { Button } from "react-native-paper";
import { FormDatePicker } from "../../../components/FormDatePicker";
import { FormPhotoPicker } from "../../../components/FormPhotoPicker";
import { useStorage } from "../../../hooks/useStorage";

type Motorbike = {
  name: string;
  purchaseDate?: Date;
  thumbnail?: ImagePicker.ImagePickerResult | null;
};

export const CreateMotorbike = () => {
  const methods = useForm<Motorbike>({
    defaultValues: {
      thumbnail: null,
      name: "",
      purchaseDate: new Date()
    }
  });
  const { handleSubmit } = methods;
  const { item, setItem } = useStorage("@motorbikes", {
    defaultValue: {}
  });

  const [isModalVisible, setModalVisible] = React.useState(true);

  const handleShowModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const onSubmit = (data: Motorbike) => {
    const id = Date.now().toString()
    const payload = Object.assign(item, { [id]: { id, ...data } })
    setItem(payload).then(() => {
      handleCloseModal();
    });
  };

  return (
    <FormProvider {...methods}>
      <Button onPress={handleShowModal}>show Modal</Button>
      <Modal
        animationType="slide"
        presentationStyle="formSheet"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Button onPress={handleCloseModal}>Cancel</Button>
            <Text>Create Motorbike</Text>
            <Button onPress={handleSubmit(onSubmit)}>Save</Button>
          </View>

          <View style={styles.thumbnailContainer}>
            <FormPhotoPicker
              name="thumbnail"
              style={styles.photo}
              placeholder={
                <Image style={styles.photo} source={require("./scooter.png")} />
              }
            />
          </View>

          <FormInput
            name="name"
            placeholder="Motorbike name"
            rules={{ required: "Name is required" }}
          />
          <View style={styles.purchaseDateContainer}>
            <Text style={styles.purchaseDateText}>Purchase date:</Text>
            <FormDatePicker name="purchaseDate" style={styles.purchaseDate} />
          </View>
        </View>
      </Modal>
    </FormProvider>
  );
};

const styles = StyleSheet.create({
  thumbnailContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  mainColumn: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 8,
    justifyContent: "flex-start"
  },
  photo: {
    width: 200,
    height: 200
  },
  submitButton: { marginTop: 8 },
  modal: {
    padding: 20,
    alignItems: "stretch"
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40
  },
  purchaseDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  purchaseDate: { width: 200 },
  purchaseDateText: { marginTop: 10 }
});
