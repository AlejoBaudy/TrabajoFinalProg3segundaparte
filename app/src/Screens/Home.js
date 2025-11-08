import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";
import LeftCol from "../components/LeftCol";
import RightCol from "../components/RightCol";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], loading: true };
  }

  componentDidMount() {
    db.collection("posts").onSnapshot((docs) => {
      let posts = [];
      docs.forEach((doc) =>
        posts.push({ id: doc.id, data: doc.data() })
      );
      this.setState({ posts, loading: false });
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
        <LeftCol />

        <View style={styles.centerCol}>
          <Text style={styles.title}>Posts</Text>
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Post post={item} navigation={this.props.navigation} />
            )}
          />
        </View>

        <RightCol />
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
  centerCol: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    alignSelf: "stretch",
    textAlign: "center",
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
  },
});

export default Home;
