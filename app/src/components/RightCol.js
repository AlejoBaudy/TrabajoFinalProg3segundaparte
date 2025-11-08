import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RightCol = () => {
  return (
    <View style={styles.rightCol}>
      <Text style={styles.rightTit}>What’s happening</Text>

      <View style={styles.card}>
        <Text style={styles.topic}>LPF · Boca Juniors</Text>
        <Text style={styles.cardTit}>Dybala</Text>
        <Text style={styles.topic}>9.3K posts</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.topic}>LPF · Racing Club</Text>
        <Text style={styles.cardTit}>Costas analiza variantes para el sabado</Text>
        <Text style={styles.topic}>5.8K posts</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.topic}>LPF · San Lorenzo</Text>
        <Text style={styles.cardTit}>Moretti escandalo mediatico</Text>
        <Text style={styles.topic}>7.4K posts</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.topic}>LPF · Independiente</Text>
        <Text style={styles.cardTit}>Guillermo asumió como entrenador hasta 2026</Text>
        <Text style={styles.topic}>10.1K posts</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.topic}>LPF · River Plate</Text>
        <Text style={styles.cardTit}>Marcelo Gallardo y Stefano Di Carlo</Text>
        <Text style={styles.topic}>12.7K posts</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.topic}>LPF · Estudiantes</Text>
        <Text style={styles.cardTit}>Eduardo Domínguez no renueva</Text>
        <Text style={styles.topic}>6.5K posts</Text>
      </View>
            <View style={styles.card}>
        <Text style={styles.topic}>LPF · Rosario Central</Text>
        <Text style={styles.cardTit}>Holan apuesta por los juveniles para la nueva temporada</Text>
        <Text style={styles.topic}>8.1K posts</Text>
      </View>
            <View style={styles.card}>
        <Text style={styles.topic}>LPF · Huracán</Text>
        <Text style={styles.cardTit}>Frank Kudelka prepara cambios tácticos de cara al torneo</Text>
        <Text style={styles.topic}>4.7K posts</Text>
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

