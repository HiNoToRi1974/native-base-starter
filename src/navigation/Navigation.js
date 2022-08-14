import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";
import { Context } from "../context/Context";
import { AxiosContext } from "../context/AxiosContext";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import HomeSceen from "../screens/HomeSceen";
import SignInScreen from "../screens/Auth/SignInScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import SettingScreen from "../screens/SettingScreen";

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: "เข้าใช้ระบบ" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: "เข้าใช้ระบบ" }}
      />
       
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name={"home-outline"} color={color} size={size} />
          ),
        }}
        component={HomeSceen}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name={"settings-outline"} color={color} size={size} />
          ),
        }}
        component={SettingScreen}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const { isLoading } = useContext(Context);
  const { verify } = useContext(AxiosContext);
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    let isMounted = true;
    if (!isAuth) {
      verify();
    }
    return () => {
      isMounted = false;
    };
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
