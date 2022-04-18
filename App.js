import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: "#FFF684"},
  headerTitleStyle: {color: "#89C7E7"},
  headerTintColor: "black",
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen 
        // options={{title: "Lets Sign Up",}}
          name="Login" 
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b2b2b2",
    alignItems: "center",
    justifyContent: "center",
    textAlign: 'center',
  },
});
