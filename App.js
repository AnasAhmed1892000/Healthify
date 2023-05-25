import React from "react";
import { Provider } from "react-redux";
import NavigationHandler from "./src/navigation";
import store from "./redux/Store";
import { StatusBar } from "react-native";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      <NavigationHandler />
    </Provider>
  );
};
export default App;
