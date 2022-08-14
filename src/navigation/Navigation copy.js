import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { Context } from "../context/Context";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { AxiosContext } from "../store/AxiosContext";
import { useSelector } from "react-redux";


const Navigation = () => {
  const { isLoading } = useContext(Context);
  const { verify } = useContext(AxiosContext);
  const isAuth = useSelector((state) => state.auth.isAuth);
  
  useEffect(() => {
    let isMounted = true;
    // if (!isAuth) {
    //   verify();
    // }
    // return () => {
    //   isMounted = false;
    // };
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuth ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
