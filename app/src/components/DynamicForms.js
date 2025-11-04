
import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
class DynamicForms extends Component {
  constructor(props) {
    super(props);
      this.state={
      comentario:"",
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>HACE UN COMENTARIO</Text>
        <TextInput style={styles.field} 
                    keyboardType='default'
                    placeholder='comentario'
                    onChangeText={ text => this.setState({comentario:text}) }
                    value={this.state.comentario}/>  
                <Pressable style={styles.button} onPress={() => this.onSubmit()}>
                      <Text style={styles.buttonText}> Enviar </Text> 
                </Pressable>
             <View>
                     <Text>
                             {this.state.comentario}
                     </Text>
            </View>
      </View>
    );
  }
  onSubmit(){
    console.log(this.state.comentario)
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
  blueButton: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    marginBottom: 15,
    width: "50%",
    height: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  orangeButton: {
    backgroundColor: "#FFA500",
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
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
    marginBottom: 20,
    width: "50%"
  },
  buttonText: {
    color: "#fff",
    textAlign: "center"
  }
});

export default DynamicForms;