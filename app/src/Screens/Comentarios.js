import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      info: this.props.route.params.info,
      id: this.props.route.params.id,
      nuevoComentario: "",
      liked: false,
      error: ""
    };
  }

  componentDidMount() { 
    let me = auth.currentUser ? auth.currentUser.email : ""; 
    let arr = this.state.info && this.state.info.likes ? this.state.info.likes : []; 
    let yaLike = arr.includes(me);
    this.setState({ liked: yaLike });
  } 

  onSubmit() {
    if (this.state.nuevoComentario === "") {
      this.setState({ error: "No podés publicar un comentario vacío." });
      return;
    }

    this.setState({ loading: true, error: "" });

    let nuevo = {
      id: Date.now().toString(),
      owner: auth.currentUser.email,
      comentario: this.state.nuevoComentario,
      createdAt: Date.now()
    };

    db.collection("posts")
      .doc(this.state.id)
      .update({
        Comentarios: firebase.firestore.FieldValue.arrayUnion(nuevo)
      })
      .then(() => {
        let infoActual = this.state.info;
        let lista = infoActual.Comentarios ? infoActual.Comentarios.slice() : [];
        lista.push(nuevo);
        infoActual.Comentarios = lista;

        this.setState({
          nuevoComentario: "",
          loading: false,
          info: infoActual
        });
      })
      .catch(() => {
        this.setState({ loading: false, error: "No se pudo publicar el comentario." });
      });
  }

  likearLocal() { 
    let me = auth.currentUser ? auth.currentUser.email : ""; 
    let infoActual = this.state.info; 
    let arr = infoActual.likes ? infoActual.likes : []; 

    if (this.state.liked) {
      let nuevoArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== me) {
          nuevoArr.push(arr[i]);
        }
      }

      db.collection("posts")
        .doc(this.state.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(me)
        })
        .then(() => {
          infoActual.likes = nuevoArr;
          this.setState({ liked: false, info: infoActual });
        });
    } else { 
      if (!arr.includes(me)) {
        db.collection("posts")
          .doc(this.state.id)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(me)
          })
          .then(() => {
            let nuevoArr = [];
            for (let i = 0; i < arr.length; i++) {
              nuevoArr.push(arr[i]);
            }
            nuevoArr.push(me);
            infoActual.likes = nuevoArr;
            this.setState({ liked: true, info: infoActual });
          });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centerCol}>
          <View style={styles.postCard}>
            <Text style={styles.postAuthor}>{this.state.info.owner}</Text>
            <Text style={styles.postDescription}>{this.state.info.description}</Text>

            <View style={styles.acciones}> 
              <Pressable
                style={styles.boton}
                onPress={() => this.likearLocal()}
              >
                <Text style={styles.texto}>
                  {this.state.liked ? "❤️" : "🤍"}{" "}
                  {this.state.info && this.state.info.likes ? this.state.info.likes.length : 0}
                </Text>
              </Pressable>

              <Pressable
                style={styles.boton}
                onPress={() => {}}
              >
                <Text style={styles.texto}>
                  💬 {this.state.info && this.state.info.Comentarios ? this.state.info.Comentarios.length : 0}
                </Text>
              </Pressable>
            </View>
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

            {this.state.error ? (
              <Text style={styles.error}>{this.state.error}</Text>
            ) : null}

            <Pressable style={styles.commentButton} onPress={() => this.onSubmit()}>
              <Text style={styles.commentButtonText}>
                {this.state.loading ? "Publicando..." : "Publicar"}
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.volverBtn}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={styles.volverTxt}>Home</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#0A5AFF",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  volverBtn: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 10
  },
  volverTxt: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  centerCol: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20
  },
  postCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    width: "90%",
    alignSelf: "center",
    marginVertical: 8
  },
  postAuthor: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  postDescription: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 14
  },
  card: {
    padding: 12,
    marginBottom: 10,
    width: "100%",
    flex: 1
  },
  empty: {
    textAlign: "center",
    color: "#777",
    fontStyle: "italic"
  },
  commentCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: 240,
    alignSelf: "center",
    marginVertical: 6,
    borderWidth: 1
  },
  commentAuthor: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6
  },
  commentText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center"
  },
  commentBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    width: "75%",
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 20
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    color: "#000",
    backgroundColor: "#fff",
    marginBottom: 10
  },
  commentButton: {
    backgroundColor: "#0A5AFF",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  commentButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  acciones: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    width:"100%",
    paddingTop: 6
  },
  boton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "rgba(223, 183, 83, 1)"
  },
  texto: {
    fontSize: 13,
    fontWeight: "bold",
    color: "white"
  },
  error: {
    color: "red",
    marginBottom: 6,
    textAlign: "center"
  }
});

export default Comentarios;