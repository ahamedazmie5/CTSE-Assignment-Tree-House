import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import Home from "./screens/Home";
import AddEvents from "./screens/AddEvents";
import ViewEvents from "./screens/ViewEvents";
import UpdateEvents from "./screens/UpdateEvents";
import EventsHome from "./screens/EventsHome";




export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen"
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddEvents" component={AddEvents} />
        <Stack.Screen name="ViewEvents" component={ViewEvents} />
        <Stack.Screen name="UpdateEvent" component={UpdateEvents} />
        <Stack.Screen name="EventsHome" component={EventsHome} />
      </Stack.Navigator>
    </NavigationContainer>
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