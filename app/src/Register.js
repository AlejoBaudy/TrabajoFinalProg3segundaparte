import React, { Component } from "react";
import { Text, View, Pressable } from "react-native";

class Register extends Component{


constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: ""
    };
  }
register(email, pass, userName){
  auth.createUserWithEmailAndPassword(email, pass)
    .then((response) => {
      return db.collection('users').add({
        email: response.user.email,          
        nombreUsuario: userName,            
        createdAt: Date.now()                
      });
    })
    .then(() => {
      this.setState({ registered: true });
      this.props.navigation.navigate('Login');
    })
    .catch((error) => {
      this.setState({ error: 'Fallo en el registro.' });
    });
}



  onSubmit() {
    this.register(this.state.email, this.state.password, this.state.userName);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>

        <Pressable
          style={styles.blueButton}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text> Ya tengo cuenta </Text>
        </Pressable>

        <TextInput
          style={styles.field}
          keyboardType='email-address'
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.field}
          keyboardType='default'
          placeholder='password'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />

        <TextInput
          style={styles.field}
          keyboardType='default'
          placeholder='Usuario'
          onChangeText={text => this.setState({ userName: text })}
          value={this.state.userName}
        />

        <Pressable style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}> Registrate </Text>
        </Pressable>

        <View>
          <Text>
            {this.state.password}
            {this.state.email}
            {this.state.userName}
          </Text>
        </View>
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
    paddingHorizontal: 10,
    marginTop: 20
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  blueButton: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    marginBottom: 15,
    width: "50%",
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  field: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderRadius: 6,
    marginVertical: 10,
    width: "50%"
  },
  button: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
    width: "50%"
  },
  buttonText: {
    color: "#fff",
    textAlign: "center"
  }
});
export default Register;