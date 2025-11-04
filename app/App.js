import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import HomeMenu from './src/components/HomeMenu'
import NewPost from './src/Screens/NewPost';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name= "Login" component={Login} options={ { headerShown: false } }/>
        <Stack.Screen name= "Register" component={Register} options={ { headerShown: false } }/>
        <Stack.Screen name= "HomeMenu" component={HomeMenu} options={ { headerShown: false } }/>
        <Stack.Screen name= "NewPost" component={NewPost} options={ { headerShown: false } }/>

    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});