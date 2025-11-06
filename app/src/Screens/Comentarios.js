import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";
import Comentario from "../components/Comentario";

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      info: this.props.route.params.info,
      id: this.props.route.params.id,
      nuevoComentario: "",
    };
  }

 onSubmit() {
  this.setState({ loading: true });

  console.log("ID del post:", this.state.id);
  console.log("Nuevo comentario:", this.state.nuevoComentario);

  db.collection("posts")
    .doc(this.state.id)
    .update({
      Comentarios: firebase.firestore.FieldValue.arrayUnion({
        id: Date.now().toString(),
        owner: auth.currentUser.email,
        comentario: this.state.nuevoComentario,
        createdAt: Date.now(),
      }),
    })
    .then(() => {
      this.setState({ nuevoComentario: "", loading: false });
    })
    .catch((error) => {
      console.log("Error al actualizar Firestore:", error);
      this.setState({ loading: false });
    });
}


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.description}>
            Comentario: {this.state.info.description}
          </Text>
          <Text style={styles.email}>Hecho por: {this.state.info.owner}</Text>
          <Text style={styles.email}>Likes: {this.state.info.likes.length}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Comentarios</Text>
         {this.state.info.Comentarios && this.state.info.Comentarios.length > 0 ? (
              <FlatList
                data={this.state.info.Comentarios}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Comentario data={item} />}
              />
            ) : (
              <Text style={styles.empty}>Aún no hay comentarios.</Text>
            )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Comenta</Text>
          <TextInput
            style={styles.field}
            placeholder="Escribí tu comentario..."
            value={this.state.nuevoComentario}
            onChangeText={(text) => this.setState({ nuevoComentario: text })}
          />
          <Pressable style={styles.boton} onPress={() => this.onSubmit()}>
            <Text style={styles.buttonText}>
              {this.state.loading ? "Publicando..." : "Publicar"}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
    width: "90%",
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  email: {
    fontSize: 12,
    color: "#555",
  },
  empty: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
  },
  field: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 8,
  },
  boton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Comentarios;
