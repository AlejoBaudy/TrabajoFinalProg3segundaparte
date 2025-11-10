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
      console.log(error);
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
    flexDirection: "row",
    paddingHorizontal: 20
  },
  izq: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  },
  bigLogo: {
    width: "85%",
    height: "55%"
  },
  der: {
    flex: 1,
    justifyContent: "center",
    gap: 18,
    paddingRight: 25
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginLeft: 120
  },
  bloque: {
    height: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    width: "50%",
    color: "white"
  },
  button1: {
    backgroundColor: "rgba(122, 206, 245, 1)",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "rgba(93, 186, 233, 1)",
    width: "50%"
  },
  buttonText: {
    color: "#fff",
    textAlign: "center"
  },
  button2: {
    backgroundColor: "#rgba(223, 183, 83, 1)",
    borderRadius: 19,
    width: "50%",
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  error: {
    color: "red",
    marginBottom: 10
  }
});

export default Register;