import React, { Component } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//chequear todos lo import
import Home from '../Screens/Home';
import Profile from '../Screens/Profile';
import NewPost from '../Screens/NewPost';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
  render() { 
    return (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={Profile} options={{ 
            headerShown: false,
            tabBarIcon: () => (
              <Entypo name="user" size={24} color="black" />
            )
          }}
        />
        <Tab.Screen name="Home" component={Home} options={{ 
            headerShown: false,
            tabBarIcon: () => (
              <AntDesign name="home" size={24} color="black" />
            )
          }}
        />
          <Tab.Screen name="Newpost" component={NewPost} options={{ 
            headerShown: false,
            tabBarIcon: () => (
              <AntDesign name="Posteos" size={24} color="black" />
            )
          }}
        />  
      </Tab.Navigator>
    );
  }
}

export default HomeMenu;