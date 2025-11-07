import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      userName: "",
      myPosts: []
    };
  }

  componentDidMount() {
    let current = auth.currentUser;

    if (current) {
      this.setState({ email: current.email });
    }

    db.collection("users")
      .where("email", "==", current.email)
      .onSnapshot((docs) => {
        let doc = docs.docs[0];
        let data = doc.data();

        this.setState({
          userName: data.nombreUsuario
        });
      });

    db.collection("posts")
      .where("owner", "==", current.email)
      .onSnapshot((posts) => {

        let misPosts = [];

        for (let i = 0; i < posts.docs.length; i++) {
          let doc = posts.docs[i];
          misPosts.push({
            id: doc.id,
            data: doc.data()
          });
        }

        this.setState({
          myPosts: misPosts
        });
      });
  }

  logout() {
    auth.signOut().then(() => {
      this.props.navigation.navigate("Login");
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.card}>
          <Text style={styles.title}>Mi Perfil</Text>

          <Text style={styles.row}>
            <Text style={styles.bold}>Usuario: </Text>
            {this.state.userName}
          </Text>

          <Text style={styles.row}>
            <Text style={styles.bold}>Email: </Text>
            {this.state.email}
          </Text>

          <Pressable style={styles.logoutBtn} onPress={() => this.logout()}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>Mis posteos</Text>

          <FlatList
            data={this.state.myPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Post post={item} navigation={this.props.navigation} />
            )}
          />
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
    padding: 12,
    marginBottom: 15
  },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  row: { fontSize: 16, marginVertical: 4 },
  bold: { fontWeight: "bold" },
  logoutBtn: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center"
  },
  logoutText: { color: "white", fontWeight: "bold" }
});

export default Profile;