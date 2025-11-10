import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable , TextInput, Image } from "react-native";
import { auth, db } from "../firebase/config";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      error: ""
    };
  }

register(email, pass, userName) {
  auth.createUserWithEmailAndPassword(email, pass)
    .then(response => {
      db.collection("users").add({
        email: response.user.email,
        nombreUsuario: userName,
        createdAt: Date.now()
      });
      auth.signOut().then(() => {
        this.props.navigation.navigate("Login");
      });
    })
    .catch(error => {
      console.log(error.message)
      if(error.message.includes("The email address is already in use by another account")){
        this.setState({
          error: "Este mail ya esta registrado"
        })
      }
    });
}
  onSubmit() {
    if (this.state.email === "") {
  this.setState({ error: "Falta completar campos obligatorios." });
  return;
}

  if (this.state.password === "") {
  this.setState({ error: "Falta completar campos obligatorios." });
  return;
}

  if (this.state.userName === "") {
  this.setState({ error: "Falta completar campos obligatorios." });
  return;
}
if (!this.state.email.includes("@")) {
      this.setState({ error: "El email ingresado no es válido." });
      return;
    }

if (this.state.password.length < 6) {
      this.setState({
        error: "La password debe tener una longitud mínima de 6 caracteres."
      });
      return;
    }

    this.register(this.state.email, this.state.password, this.state.userName);
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
          <Text style={styles.titulo}>Registro</Text>

          <TextInput
            style={styles.bloque}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />

          <TextInput
            style={styles.bloque}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => this.setState({ password: text })}
            value={this.state.password}
          />

          <TextInput
            style={styles.bloque}
            placeholder="Usuario"
            onChangeText={text => this.setState({ userName: text })}
            value={this.state.userName}
          />

          {this.state.error ? (
            <Text style={styles.error}>{this.state.error}</Text>
          ) : null}

          <Pressable style={styles.button1} onPress={() => this.onSubmit()}>
            <Text style={styles.buttonText}>Registrate</Text>
          </Pressable>

          <Pressable
            style={styles.button2}
            onPress={() => this.props.navigation.navigate("Login")}
          >
            <Text>Ya tengo cuenta</Text>
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
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 20,
},

izq: {
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 20,
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
  fontSize: 28,
  fontWeight: "bold",
  color: "white",
  textAlign: "center",
  marginBottom: 10,
},

bloque: {
  width: "90%",
  backgroundColor: "white",
  borderRadius: 12,
  paddingHorizontal: 15,
  paddingVertical: 12,
  fontSize: 16,
  marginVertical: 6,
  color: "black",
  borderWidth: 0,
},

button1: {
  width: "90%",
  backgroundColor: "rgba(122, 206, 245, 1)",
  paddingVertical: 14,
  borderRadius: 25,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
  borderWidth: 0,
},

buttonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},

button2: {
  width: "90%",
  backgroundColor: "rgba(223, 183, 83, 1)",
  borderRadius: 25,
  paddingVertical: 14,
  alignItems: "center",
  justifyContent: "center",
  marginTop: 8,
},

error: {
  color: "red",
  marginTop: 8,
  fontSize: 14,
  textAlign: "center",
  fontWeight: "600",
},

});

export default Register;