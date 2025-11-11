import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Pressable, ActivityIndicator } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";
import Post from "../components/Post";

class Comentarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      loading: true,
      nuevoComentario: "",
      error: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.route.params;

    db.collection("posts").onSnapshot((docs) => {
      let posts = [];
      docs.forEach((doc) => posts.push({ id: doc.id, data: doc.data() }));

      let seleccionado = null;
      posts.forEach((p) => {
        if (id.includes(p.id))
          seleccionado = p;
      });

      this.setState({ post: seleccionado, loading: false });
    });
  }

  onSubmit() {
    if (this.state.nuevoComentario === "") {
      this.setState({ error: "No podés publicar un comentario vacío." });
      return;
    }

    if (!this.state.post) return;

    this.setState({ loading: true, error: "" });

    const nuevo = {
      id: Date.now().toString(),
      owner: auth.currentUser.email,
      comentario: this.state.nuevoComentario,
      createdAt: Date.now(),
    };

    db.collection("posts")
      .doc(this.state.post.id)
      .update({
        Comentarios: firebase.firestore.FieldValue.arrayUnion(nuevo),
      })
      .then(() => {
        this.setState({ nuevoComentario: "", loading: false });
      })
      .catch(() => {
        this.setState({ loading: false, error: "No se pudo publicar el comentario." });
      });
  }

  render() {
    if (this.state.loading && !this.state.post) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="#fff" />
        </View>
      );
    }

    if (!this.state.post) {
      return (
        <View style={styles.container}>
          <Text style={styles.empty}>Post no encontrado.</Text>
        </View>
      );
    }

    const comentarios = this.state.post.data.Comentarios;

    return (
      <View style={styles.container}>
        <View style={styles.centerCol}>
          <Post post={this.state.post} navigation={this.props.navigation} />

          <View style={styles.card}>
            {comentarios.length > 0 ? (
              <FlatList
                data={comentarios}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.commentCard}>
                    <Text style={styles.commentUsu}>{item.owner}</Text>
                    <Text style={styles.commentText}>{item.comentario}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noComents}>Aún no hay comentarios.</Text>
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

            {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}

            <Pressable style={styles.commentButton} onPress={() => this.onSubmit()}>
              <Text style={styles.commentButtonText}>
                {this.state.loading ? "Publicando..." : "Publicar"}
              </Text>
            </Pressable>
          </View>

          <Pressable
                style={styles.volverBtn}
                onPress={() => {
                  console.log("apreté");
                  if (this.props.route.params.from === "profile") {
                    this.props.navigation.navigate("HomeMenu", { screen: "HomePage" });
                  } else {
                    this.props.navigation.navigate("Home", { screen: "HomePage" });
                  }
                }}
              >
                <Text style={styles.volverTxt}>Volver</Text>
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
    paddingHorizontal: 20, 
    paddingTop: 20 
  },

  centerCol: { 
    flex: 1, 
    alignItems: "center", 
    paddingHorizontal: 20 
  },

  card: { 
    width: 220, 
    flex: 1, 
    padding: 12, 
    marginBottom: 10 
  },

  noComents: { 
    textAlign: "center", 
    color: "#777", 
    fontStyle: "italic" 
  },

  commentCard: {  
    borderWidth: 1, 
    borderColor: "rgba(255,255,255,0.3)", 
    backgroundColor: "rgba(255,255,255,0.1)", 
    borderRadius: 12, 
    padding: 14, 
    marginTop: 8, 
    alignSelf: "center" 
  },

  commentUsu: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: 6, 
    textAlign: "center" 
  },

  commentText: { 
    fontSize: 16, 
    color: "#fff", 
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

  volverBtn: { 
    backgroundColor: "red", 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    width: "70%", 
    borderRadius: 20, 
    marginVertical: 16, 
    alignItems: "center", 
    alignSelf: "center" 
  },

  volverTxt: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },

  error: { 
    color: "red", 
    marginBottom: 6, 
    textAlign: "center" 
  },
});


export default Comentarios;
