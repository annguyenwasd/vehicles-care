import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";

import useCachedResources from "./hooks/useCachedResources";
import { CreateMotorbike } from "./screens/motorbike-management/create/CreateMotorbike";
import { ListMotorbike } from "./screens/motorbike-management/list/ListMotorbike";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <ListMotorbike visible={true}  />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
