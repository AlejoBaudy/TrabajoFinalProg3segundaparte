import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image, ActivityIndicator} from "react-native";
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

          posts.docs.forEach(function(doc) {
            misPosts.push({
              id: doc.id,
              data: doc.data()
          });
});

this.setState({
  myPosts: misPosts
});

      });
  }

  logout() {
    auth.signOut().then(() => {
      this.props.navigation.navigate("StackHome");
    });
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
      <Image source={require("../../assets/Anonimo.jpg")} style={styles.avatar} />
      <Text style={styles.name}>{this.state.userName}</Text>
      <Text style={styles.email}>{this.state.email}</Text>

      <Text style={styles.sectionTitle}>Mis posteos</Text>
      <View style = {styles.flatlist}>
        <FlatList
        data={this.state.myPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post post={item} navigation={this.props.navigation} origen="profile" />
        )}
      />
      </View>
    
      <Pressable style={styles.logoutBtn} onPress={() => this.logout()}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 16,
  },
  centerCol: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  name: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
  },
  email: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    marginBottom: 14,
    textAlign: "center",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  flatlist: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  logoutBtn: {
    backgroundColor: "red",
    paddingVertical: 12,
    width: "70%",
    borderRadius: 20,
    marginVertical: 16,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});


export default Profile;