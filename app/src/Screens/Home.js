import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Image } from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection('posts').onSnapshot(docs => {
      let posts = [];
      docs.forEach(doc => {
        posts.push({
          id: doc.id,
          data: doc.data()
        });
      });
      this.setState({
        posts: posts,
        loading: false
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Image source={require("../../assets/LogoAFA.png")} style={styles.logo} />
        <Text style={styles.title}>Posts</Text>
      <FlatList
          data={this.state.posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post post={item} navigation={this.props.navigation} />
      )}
/>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#0A5AFF",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#FFFFFF",
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 20,
    marginBottom: 10,
    resizeMode: "contain",
  },
});


export default Home;