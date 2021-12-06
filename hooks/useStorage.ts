import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

type Option = {
  defaultValue?: any;
};

interface HookResult<T> {
  item: T;
  setItem: (item: T) => Promise<void>;
  getItem: () => Promise<T>;
}

export function useStorage<T>(key: string, options: Option): HookResult<T> {
  const [item, setItem] = React.useState<T>(options.defaultValue);
  const { defaultValue } = options;

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
      return jsonValue != null
        ? JSON.parse(jsonValue)
        : defaultValue
          ? defaultValue
          : null;
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    getStorage().then(value => {
      setItem(value);

      // in case no value saved
      if (!value && defaultValue) {
        setItem(defaultValue);
        setStorage(defaultValue);
      }
    });
  }, []);

  return { setItem: setStorage, item, getItem: getStorage };
};
