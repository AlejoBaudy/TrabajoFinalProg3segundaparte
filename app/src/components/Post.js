import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase"; 
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Comentarios from "../screens/Comentarios";
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
    const userEmail = this.state.user.email;
    const arrayLikes = this.state.likes || [];
    if (arrayLikes.includes(userEmail)) {
      this.setState({ liked: true });
    }
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
    <View style={styles.card}>
      <Text style={styles.nombre}>{this.props.post.data.owner}</Text>
      <Text style={styles.descripcion}>{this.props.post.data.description}</Text>
      <View style={styles.acciones}>
        <Pressable style={styles.boton} onPress={() => this.likear()}>
          <Text style={styles.texto}>
            {this.state.liked ? "❤️" : "🤍"} {this.props.post.data.likes.length}
          </Text>
        </Pressable>
        <Pressable style={styles.boton} onPress={() =>
            {
              if (this.props.cancelarComentario) { return; } 
              this.props.navigation.navigate("Comentarios", {
                info: this.props.post.data,
                id: this.props.post.id,
              });
            } 
          }
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
    backgroundColor: "black",
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  descripcion: {
    fontSize: 17,
    color: "white",
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 13
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
export default Post