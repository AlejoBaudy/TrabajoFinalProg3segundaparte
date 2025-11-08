import React from "react";
import { View, Text, StyleSheet } from "react-native";

const LeftCol = () => {
const clubes = [
    "Boca Juniors","River Plate","Racing","Independiente","San Lorenzo",
    "Huracán","Vélez","Argentinos","Estudiantes","Gimnasia",
    "Rosario Central","Newell's","Talleres","Lanús","Defensa y Justicia"
  ];
  return (
    <View style={styles.leftCol}>
      <Text style={styles.leftTit}>
        ¡Toda la información de tu club favorito!
      </Text>

      <View style={styles.clubesWrap}>
        {clubes.map((club, index) => (
          <View key={index} style={styles.club}>
            <Text style={styles.clubText}>{club}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftCol: {
    width: "25%",
    paddingRight: 10,
    borderRightWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  leftTit: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  clubesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
  },

  club: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 6,
  },

  clubText: {
    color: "#0A3D91",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LeftCol;

  