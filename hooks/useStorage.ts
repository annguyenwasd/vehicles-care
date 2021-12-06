import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

type Option = {
  defaultValue?: any;
};

export const useStorage = (key: string, options: Option) => {
  const [item, setItem] = React.useState();

  const setStorage = async (value: any) => {
    try {
      setItem(value);
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  const getStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    getStorage().then(value => {
      setItem(value);
      const { defaultValue } = options;

      // in case no value saved
      if (!value && defaultValue) {
        setItem(defaultValue);
        setStorage(defaultValue);
      }
    });
  }, []);

  return { setItem: setStorage, item };
};
