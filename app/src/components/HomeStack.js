import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home";
import Comentarios from "../Screens/Comentarios";

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
