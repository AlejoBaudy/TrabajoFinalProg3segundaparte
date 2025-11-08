import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, Image } from "react-native";
import { db, auth } from "../firebase/config"; 

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      loading: false,
    };
  }

  onSubmit() {
    this.setState({ loading: true });
    db.collection("posts")
      .add({
        owner: auth.currentUser.email,
        description: this.state.description,
        createdAt: Date.now(),
        likes: [],
        Comentarios: [],
      })
      .then(() => {
        this.setState({ description: "", loading: false });
      })
      .catch(() => {
        this.setState({ error: "No se pudo guardar el post.", loading: false });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../assets/LogoAFA.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.titulo}>Comenta ahora</Text>

        <TextInput
          style={styles.field}
          placeholder="Escribí tu mensaje..."
          placeholderTextColor="#ccc"
          value={this.state.description}
          onChangeText={(text) => this.setState({ description: text })}
        />

        <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
          <Text style={styles.botonTexto}>
            {this.state.loading ? "Publicando..." : "Publicar"}
          </Text>
        </Pressable>
      </View>
    );
  }
}

const BLUE = "#0A5AFF";
const WHITE = "#FFFFFF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  titulo: {
    color: WHITE,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  field: {
    width: "85%",
    height: 60,
    backgroundColor: WHITE,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: WHITE,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  botonTexto: {
    color: BLUE,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NewPost;
