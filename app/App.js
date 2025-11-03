import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Login';
import Register from './src/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function App() {
const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name= "Login" component={Login} options={ { headerShown: false } }/>
        <Stack.Screen name= "Register" component={Register} options={ { headerShown: false } }/>
      

    </Stack.Navigator>
    </NavigationContainer>
  );
}


