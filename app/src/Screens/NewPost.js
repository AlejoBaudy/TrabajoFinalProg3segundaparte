import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
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
        Comentarios: []
      })
      .then(() => {
        this.setState({
          description: "",
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          error: "No se pudo guardar el post.",
          loading: false,
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Nuevo post</Text>
        <TextInput
          style={styles.field}
          placeholder="Escribí tu mensaje..."
          value={this.state.description}
          onChangeText={(text) => this.setState({ description: text })}
        />
        <Pressable onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}>
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
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  field: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    height: 60,
    width: 280,
    marginBottom: 10,
  },
  buttonText: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
    width: "6%",
  },
});

export default NewPost;