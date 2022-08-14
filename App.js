import { StyleSheet } from "react-native";
import { AxiosProvider } from "./src/context/AxiosContext";
import { Provider as ContextProvider } from "./src/context/Context";
import { TailwindProvider } from "tailwindcss-react-native";
import { store } from "./src/store";
import { Provider as ReduxProvider } from "react-redux";
import Navigation from "./src/navigation/Navigation";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ContextProvider>
        <AxiosProvider>
          <NativeBaseProvider>
            <TailwindProvider>
              <Navigation />
            </TailwindProvider>
          </NativeBaseProvider>
        </AxiosProvider>
      </ContextProvider>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
