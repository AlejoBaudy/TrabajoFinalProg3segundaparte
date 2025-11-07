import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Comentarios from "../screens/Comentarios";

;

const HomeStack = createNativeStackNavigator();

class HomeStackScreen extends Component {
  render() {
    return (
      <HomeStack.Navigator screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="HomePage" component={Home} />
        <HomeStack.Screen name="Comentarios" component={Comentarios} />
      </HomeStack.Navigator>
    );
  }
}

export default HomeStackScreen;
