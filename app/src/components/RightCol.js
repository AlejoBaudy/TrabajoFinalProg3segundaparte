import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RightCol = () => {
  return (
    <View style={styles.rightCol}>
      <Text style={styles.rightTit}>What’s happening</Text>

      <View style={styles.card}>
        <Text style={styles.topic}>LPF · River Plate</Text>
        <Text style={styles.cardTit}>Renovación de Gallardo cada vez más cerca</Text>
        <Text style={styles.topic}>12.7K posts</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.topic}>LPF · Boca Juniors</Text>
        <Text style={styles.cardTit}>Riquelme confirmó refuerzos para el 2025</Text>
        <Text style={styles.topic}>9.3K posts</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.topic}>LPF · Racing Club</Text>
        <Text style={styles.cardTit}>Gago analiza variantes para el clásico</Text>
        <Text style={styles.topic}>5.8K posts</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.topic}>LPF · San Lorenzo</Text>
        <Text style={styles.cardTit}>Insúa busca reforzar el mediocampo</Text>
        <Text style={styles.topic}>7.4K posts</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.topic}>LPF · Independiente</Text>
        <Text style={styles.cardTit}>El Rojo apunta a una nueva comisión técnica</Text>
        <Text style={styles.topic}>10.1K posts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightCol: {
    width: "25%",
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  rightTit: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
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

export default RightCol;

