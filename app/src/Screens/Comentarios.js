import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";
import Comentario from "../components/Comentario";
import LeftCol from "../components/LeftCol";
import RightCol from "../components/RightCol";

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
  likear() {
    db.collection("posts")
      .doc(this.props.post.id)
      .update({
        likes: this.state.liked
          ? firebase.firestore.FieldValue.arrayRemove(this.state.user.email)
          : firebase.firestore.FieldValue.arrayUnion(this.state.user.email),
      })
      .then(() => this.setState({ liked: !this.state.liked }))
      .catch((error) => console.log(error));
  }

  render() {
   
  return (
  <View style={styles.container}>
      <LeftCol/>
    <View style={styles.centerCol}>
      <View style={styles.postCard}>
        <Text style={styles.postAuthor}>{this.state.info.owner}</Text>
        <Text style={styles.postDescription}>{this.state.info.description}</Text>
      </View>
      <View style={styles.card}>
        {this.state.info.Comentarios && this.state.info.Comentarios.length > 0 ? (
            <FlatList
              data={this.state.info.Comentarios}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.commentCard}>
                  <Text style={styles.commentAuthor}>{item.owner}</Text>
                  <Text style={styles.commentText}>{item.comentario}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.empty}>Aún no hay comentarios.</Text>
          )}
      </View>


        <View style={styles.commentBox}>
            <TextInput
              style={styles.commentInput}
              placeholder="Escribí tu comentario..."
              placeholderTextColor="#555"
              value={this.state.nuevoComentario}
              onChangeText={(text) => this.setState({ nuevoComentario: text })}
            />
            <Pressable style={styles.commentButton} onPress={() => this.onSubmit()}>
              <Text style={styles.commentButtonText}>
                {this.state.loading ? "Publicando..." : "Publicar"}
              </Text>
            </Pressable>
        </View>


    </View>
    <RightCol/>
  </View>
);
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0A5AFF",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  leftCol: {
    width: "25%",
    paddingRight: 10,
    borderRightWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  leftTit: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  clubesWrap: {
    flexDirection: "column",
    flexWrap: "nowrap",
    marginTop: 6,
  },
  club: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 8,
    width: "100%",
  },
  clubText: {
    color: "#0A3D91",
    fontSize: 16,
    fontWeight: "bold",
  },
  centerCol: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  postCard: {
    backgroundColor: "#000",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    width: "90%",
    alignSelf: "center",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(223,183,83,0.7)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  postAuthor: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postDescription: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 14,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  empty: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic",
  },
  commentCard: {
    backgroundColor: "#000",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 240,
    alignSelf: "center",
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(223,183,83,0.7)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  commentAuthor: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  commentText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
  commentBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    width: "37%",
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    color: "#000",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: "#0A5AFF",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  commentButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  rightCol: {
    width: "25%",
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  rightTit: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  cardTit: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 3,
  },
  topic: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
    acciones: {
    flexDirection: "row",
    gap: 110,
    paddingTop: 6,
  },
  boton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "rgba(223, 183, 83, 1)",
  },
  texto: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
  },
});

export default Comentarios;