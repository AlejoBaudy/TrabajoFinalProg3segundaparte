import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
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

  componentDidMount(){
    const userEmail = this.state.user.email;
    const arrayLikes= this.state.likes
    if(arrayLikes.includes(userEmail)){
      this.setState({
        liked: true
      })
    }
  }

  likear(){
    db.collection('posts')
      .doc(this.props.post.id)
      .update({
        likes: this.state.liked 
          ? firebase.firestore.FieldValue.arrayRemove(this.state.user.email) 
          : firebase.firestore.FieldValue.arrayUnion(this.state.user.email)
      })
      .then(() => {
        this.setState({ liked: !this.state.liked });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.description}>
          Comentario:{this.props.post.data.description}
        </Text>
        <Text style={styles.email}>
          Hecho por:{this.props.post.data.owner}
        </Text>
        <Text style={styles.email}>
          Likes:{this.props.post.data.likes.length}
        </Text>

        {this.state.liked ? (
          <Pressable style={styles.boton} onPress={() => this.likear()}>
            <Text style={styles.email}>Deslikear</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.boton} onPress={() => this.likear()}>
            <Text style={styles.email}>Likear</Text>
          </Pressable>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
    width: "90%",
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
  },
  email: {
    fontSize: 12,
    color: "#555",
  },
  boton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    width: 60,
    alignItems: "center",
  },
});

export default Post;