
import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import HomeMenu from "./src/components/HomeMenu";
import NewPost from "./src/screens/NewPost";
import Comentarios from "./src/screens/Comentarios";
import StackPresent from "./src/screens/StackPresent";

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                contentStyle: { backgroundColor: "transparent" },
                headerShown: false,
              }}
            >
              <Stack.Screen name="StackHome" component={StackPresent} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="HomeMenu" component={HomeMenu} />
              <Stack.Screen name="NewPost" component={NewPost} />
              <Stack.Screen name="Comentarios" component={Comentarios} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </View>
    );
  }
}
 const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 110,
  },
  content: {
    flex: 1,
    alignSelf: "stretch",
  },
});





export default App;
