import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, Image } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";
import LeftCol from "../components/LeftCol";
import RightCol from "../components/RightCol";

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
    <LeftCol/>
    <View style={styles.centerCol}>
      <Image source={require("../../assets/Anonimo.jpg")} style={styles.avatar} />
      <Text style={styles.name}>{this.state.userName}</Text>
      <Text style={styles.email}>{this.state.email}</Text>

      <Text style={styles.sectionTitle}>Mis posteos</Text>
      <FlatList
        data={this.state.myPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Post post={item} navigation={this.props.navigation} />
        )}
      />
      <Pressable style={styles.logoutBtn} onPress={() => this.logout()}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </Pressable>
    </View>
    <RightCol/>     
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
    paddingTop: 20,
  },
leftCol: { 
  width: "25%", 
  paddingRight: 10, 
  borderRightWidth: 1, 
  borderColor: "rgba(255,255,255,0.3)" 
},
leftTit: { 
  color: "#FFFFFF", 
  fontSize: 16, 
  fontWeight: "bold", 
  marginBottom: 10 
},
clubesWrap: { 
  flexDirection: "column", 
  flexWrap: "nowrap", 
  marginTop: 6 
},
club: { 
  backgroundColor: "#FFFFFF", 
  borderRadius: 12, 
  paddingVertical: 10, 
  paddingHorizontal: 14, 
  marginBottom: 8, 
  width: "100%" 
},
clubText: { 
  color: "#0A3D91", 
  fontSize: 16, 
  fontWeight: "bold" 
},
  centerCol: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
avatar: { 
  width: 120, 
  height: 120, 
  borderRadius: 60, 
  marginBottom: 10, 
  resizeMode: "contain" 
},
name: { 
  color: "#FFFFFF", 
  fontSize: 22, 
  fontWeight: "bold", 
  marginTop: 4, 
  marginBottom: 2 
},
email: { 
  color: "rgba(255,255,255,0.8)", 
  fontSize: 13, 
  marginBottom: 14 
},
sectionTitle: { 
  color: "#FFFFFF", 
  fontSize: 18, 
  fontWeight: "bold", 
  textAlign: "center",   
  marginBottom: 8, 
},
logoutBtn: { 
  backgroundColor: "#d9534f", 
  padding: 10, 
  width: "27%",
  marginLeft: 240,
  borderRadius: 19, 
  marginBottom: 14,
  alignItems: "center", 
  alignSelf: "stretch" 
},
logoutText: { 
  color: "#fff", 
  fontWeight: "bold" 
},

rightCol: { 
  width: "25%", 
  paddingLeft: 10, 
  borderLeftWidth: 1, 
  borderColor: "rgba(255,255,255,0.3)" 
},

rightTit: { 
  color: "#FFFFFF", 
  fontSize: 18, 
  fontWeight: "bold", 
  marginBottom: 10, 
  textAlign: "center" 
},
  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    gap: 2
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
});


export default Profile;