import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import NewPost from '../screens/NewPost';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeStackScreen from "./HomeStack";

const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
  render() { 
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} options={{
            headerShown: false,
            tabBarIcon: () => (
              <AntDesign name="home" size={24} color="black" />
            )
          }}
        />
        <Tab.Screen name="Profile" component={Profile} options={{ 
            headerShown: false,
            tabBarIcon: () => (
              <Entypo name="user" size={24} color="black" />
            )
          }}
        />
          <Tab.Screen name="Post" component={NewPost} options={{ 
            headerShown: false,
            tabBarIcon: () => (
              <AntDesign name="twitter" size={24} color="black" />
            )
          }}
        />  
      </Tab.Navigator>
    );
  }
}

export default HomeMenu;
