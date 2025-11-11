import React, { Component } from "react";
import {View,Text,StyleSheet,FlatList,TextInput,Pressable,ActivityIndicator} from "react-native";
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
      error: "",
      user: auth.currentUser
    };
  }

  // ✅ EXACTO MISMO FORMATO Y LÓGICA QUE Post
  componentDidMount() {
    const userEmail = this.state.user.email;
    const arrayLikes = this.state.info.likes || [];

    if (arrayLikes.includes(userEmail)) {
      this.setState({ liked: true });
    }
  }

  // ✅ LÓGICA IGUAL A Post + contador actualizado localmente
  likear() {
    const userEmail = this.state.user.email;
    const postRef = db.collection("posts").doc(this.state.id);

    postRef
      .update({
        likes: this.state.liked
          ? firebase.firestore.FieldValue.arrayRemove(userEmail)
          : firebase.firestore.FieldValue.arrayUnion(userEmail)
      })
      .then(() => {
        const nuevoLiked = !this.state.liked;
        const infoActual = { ...this.state.info };
        const arr = infoActual.likes ? infoActual.likes : [];
        const nuevoArr = [];

        if (nuevoLiked) {
          // LIKE
          let yaEstaba = arr.includes(userEmail);

          for (let i = 0; i < arr.length; i++) {
            nuevoArr.push(arr[i]);
          }

          if (!yaEstaba) {
            nuevoArr.push(userEmail);
          }

        } else {
          // UNLIKE
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== userEmail) {
              nuevoArr.push(arr[i]);
            }
          }
        }

        infoActual.likes = nuevoArr;

        this.setState({
          liked: nuevoLiked,
          info: infoActual
        });
      })
      .catch(() => this.setState({ error: "No se pudo actualizar el like." }));
  }

  onSubmit() {
    if (this.state.nuevoComentario === "") {
      this.setState({ error: "No podés publicar un comentario vacío." });
      return;
    }

    this.setState({ loading: true, error: "" });

    const nuevo = {
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
        const infoActual = { ...this.state.info };
        const lista = infoActual.Comentarios ? infoActual.Comentarios : [];
        const nuevaLista = [];

        for (let i = 0; i < lista.length; i++) {
          nuevaLista.push(lista[i]);
        }

        nuevaLista.push(nuevo);
        infoActual.Comentarios = nuevaLista;

        this.setState({
          nuevoComentario: "",
          loading: false,
          info: infoActual
        });
      })
      .catch(() =>
        this.setState({
          loading: false,
          error: "No se pudo publicar el comentario."
        })
      );
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator color="#fff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.centerCol}>

          {/* POST */}
          <View style={styles.postCard}>
            <Text style={styles.postAuthor}>{this.state.info.owner}</Text>
            <Text style={styles.postDescription}>
              {this.state.info.description}
            </Text>

            <View style={styles.acciones}>
              <Pressable style={styles.boton} onPress={() => this.likear()}>
                <Text style={styles.texto}>
                  {this.state.liked ? "❤️" : "🤍"}{" "}
                  {this.state.info.likes ? this.state.info.likes.length : 0}
                </Text>
              </Pressable>

              <Pressable style={styles.boton}>
                <Text style={styles.texto}>
                  💬{" "}
                  {this.state.info.Comentarios
                    ? this.state.info.Comentarios.length
                    : 0}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* LISTA COMENTARIOS */}
          <View style={styles.card}>
            {this.state.info.Comentarios &&
            this.state.info.Comentarios.length > 0 ? (
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

          {/* CAJA DE COMENTARIO */}
          <View style={styles.commentBox}>
            <TextInput
              style={styles.commentInput}
              placeholder="Escribí tu comentario..."
              placeholderTextColor="#555"
              value={this.state.nuevoComentario}
              onChangeText={(t) => this.setState({ nuevoComentario: t })}
            />

            {this.state.error ? (
              <Text style={styles.error}>{this.state.error}</Text>
            ) : null}

            <Pressable
              style={styles.commentButton}
              onPress={() => this.onSubmit()}
            >
              <Text style={styles.commentButtonText}>Publicar</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.volverBtn}
            onPress={() => this.props.navigation.navigate("HomePage")}
          >
            <Text style={styles.volverTxt}>Volver a Home</Text>
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
  paddingHorizontal: 16,
  width: "70%",
  borderRadius: 20,
  marginVertical: 16,
  alignItems: "center",
  alignSelf: "center",
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
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.3)",
  borderRadius: 12,
  padding: 14,
  marginTop: 8,
  width: 250,
  alignSelf: "center",
  backgroundColor: "rgba(255,255,255,0.1)",
},

postAuthor: {
  fontSize: 17,
  fontWeight: "bold",
  color: "white",
  marginBottom: 5,
},

postDescription: {
  color: "#fff",
  fontSize: 17,
  textAlign: "center",  
  marginBottom: 14,
  alignSelf: "center", 
  width: "90%",
},

commentCard: {
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.3)",
  borderRadius: 12,
  padding: 14,
  marginTop: 8,
  width: 250,
  alignSelf: "center",
  backgroundColor: "rgba(255,255,255,0.1)",
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
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.3)",
  borderRadius: 12,
  padding: 14,
  marginTop: 8,
  width: 200,
  alignSelf: "center",
  backgroundColor: "rgba(255,255,255,0.1)",
},

commentAuthor: {
  fontSize: 17,
  fontWeight: "bold",
  color: "white",
  marginBottom: 5,
  textAlign: "left",
    textAlign: "center",
},

commentText: {
  color: "#fff",
  fontSize: 17,
  textAlign: "center",  
  alignSelf: "center",  
  width: "90%",
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