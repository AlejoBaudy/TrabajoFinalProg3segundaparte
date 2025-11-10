
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
  flexDirection: "column",
  paddingHorizontal: 20,
  justifyContent: "center",
  alignItems: "center",
},

izq: {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 16,
},

bigLogo: {
  width: 140,
  height: 140,
},

der: {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  gap: 18,
  paddingHorizontal: 24,
},

titulo: {
  color: "white",
  fontSize: 28,
  fontWeight: "bold",
  textAlign: "center",
  marginLeft: 0,
},

subtitulo: {
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
  marginTop: 8,
  textAlign: "center",
},

Login: {
  width: "92%",
  paddingVertical: 16,
  borderRadius: 28,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.6)",
  backgroundColor: "transparent",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center",
},

Registro: {
  width: "92%",
  paddingVertical: 16,
  borderRadius: 28,
  borderWidth: 1,
  borderColor: "white",
  backgroundColor: "white",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center",
},

Cuenta: {
  color: "#000",
  fontSize: 16,
  fontWeight: "bold",
},

InciarSesion: {
  color: "white",
  fontSize: 18,
  fontWeight: "bold",
},

});

export default StackPresent