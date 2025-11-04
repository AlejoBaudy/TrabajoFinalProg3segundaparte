import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
class Profile extends Component {
constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Perfil</Text>
      <Pressable style={styles.orangeButton}
            onPress={ ()=> this.props.navigation.navigate('Login')}>
            <Text>Salir de la app. Hacer click aqui que te lleva a login </Text>
      </Pressable>
      </View>
    );
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  orangeButton: {
    backgroundColor: "#FFA500",
    borderRadius: 10,
    marginBottom: 15,
    width: "50%",
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
});
export default Profile;