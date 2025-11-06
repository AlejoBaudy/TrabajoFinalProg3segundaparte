import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import DynamicForms from "../components/DynamicForms";
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
        <DynamicForms/>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#333",
  },
});

export default Home;