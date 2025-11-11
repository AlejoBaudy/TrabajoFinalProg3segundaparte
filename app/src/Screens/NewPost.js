import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, Image } from "react-native";
import { db, auth } from "../firebase/config"; 

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      loading: false,
      error: ""
    };
  }

  onSubmit() {
    if (this.state.description === "") {
      this.setState({ error: "No podés publicar un comentario vacío." });
      return;
    }

    this.setState({ loading: true, error: "" });

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

        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}

        <Pressable
          style={styles.boton}
          onPress={() => this.onSubmit()}
          disabled={this.state.loading}
        >
          <Text style={styles.botonTexto}>
            {this.state.loading ? "Publicando..." : "Publicar"}
          </Text>
        </Pressable>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A5AFF",
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
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  field: {
    width: "85%",
    height: 60,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: "red",
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  boton: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  botonTexto: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default NewPost;