import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth.currentUser,
      liked: false,
      likes: this.props.post.data.likes
    };
  }

  componentDidMount() {
    let me = auth.currentUser.email;
    let arr = this.state.likes ? this.state.likes : [];
    let yaLike = arr.includes(me);
    this.setState({ liked: yaLike });
  }

  likear() {
    let me = this.state.user.email;
    let arr = this.state.likes ? this.state.likes : [];
    let infoActual = arr;
    let nuevoArr = [];

    if (this.state.liked) {
      db.collection("posts")
        .doc(this.props.post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(me)
        })
        .then(() => {
          for (let i = 0; i < infoActual.length; i++) {
            if (infoActual[i] !== me) {
              nuevoArr.push(infoActual[i]);
            }
          }

          this.setState({
            liked: false,
            likes: nuevoArr
          });
        });
    } else {
      db.collection("posts")
        .doc(this.props.post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(me)
        })
        .then(() => {
          let nuevo = [];
          for (let i = 0; i < infoActual.length; i++) {
            nuevo.push(infoActual[i]);
          }
          nuevo.push(me);

          this.setState({
            liked: true,
            likes: nuevo
          });
        });
    }
  }

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.nombre}>{this.props.post.data.owner}</Text>
        <Text style={styles.descripcion}>{this.props.post.data.description}</Text>

        <View style={styles.acciones}>
          <Pressable style={styles.boton} onPress={() => this.likear()}>
            <Text style={styles.texto}>
              {this.state.liked ? "❤️" : "🤍"} {this.state.likes.length}
            </Text>
          </Pressable>

          <Pressable
            style={styles.boton}
            onPress={() => {
              if (this.props.cancelarComentario) { return; }
              this.props.navigation.navigate("Comentarios", {
                info: this.props.post.data,
                id: this.props.post.id,
              });
            }}
          >
            <Text style={styles.texto}>
              💬 {this.props.post.data.Comentarios ? this.props.post.data.Comentarios.length : 0}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    width: 250,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.3)"
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5
  },
  descripcion: {
    fontSize: 17,
    color: "white",
    marginBottom: 10,
    marginTop: 13
  },
  acciones: {
    flexDirection: "row",
    gap: 110,
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
  }
});

export default Post;