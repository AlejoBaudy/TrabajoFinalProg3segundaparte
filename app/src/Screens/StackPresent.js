
import React, { Component } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { auth } from "../firebase/config"

 class StackPresent extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount(){
  auth.onAuthStateChanged(user => {
          if(user){
            this.props.navigation.navigate("HomeMenu")
          }
        })
     
 }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.izq}>
          <Image
            source={require("../../assets/LogoAFA.png")}
            style={styles.bigLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.der}>
          <Text style={styles.titulo}>Todo lo que pasa en nuestra liga</Text>
          <Text style={styles.subtitulo}>¡No te pierdas nada!</Text>
          <Pressable
            onPress={() => this.props.navigation.navigate("Login")}
            style={styles.Login}
          >
            <Text style={styles.InciarSesion}>Iniciar sesión</Text>
          </Pressable>

          <Pressable
            onPress={() => this.props.navigation.navigate("Register")}
            style={styles.Registro}
          >
            <Text style={styles.Cuenta}>Crear cuenta</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A5AFF",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  izq: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  bigLogo: {
    width: "85%",
    height: "55%",
  },
  der: {
    flex: 1,
    justifyContent: "center",
    gap: 18,
    paddingRight: 25
  },
  titulo: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 55,

  },
  subtitulo: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  Login: {
    width: "100%", 
    padding: 14,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  Registro: {
    width: "100%", 
    padding: 14,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  Cuenta: {
    color: "Black",
    fontSize: 16,
    fontWeight: "Bold",
  },
  InciarSesion: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default StackPresent