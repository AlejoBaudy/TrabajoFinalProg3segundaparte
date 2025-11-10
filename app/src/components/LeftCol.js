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
    height: "100%",         
    justifyContent: "flex-start",
    gap: 4,
  },

  clubesWrap: {
    flexDirection: "column",
    flexWrap: "nowrap",
    marginTop: 6,
    flex: 1,              
    justifyContent: "space-between", 
  },

  leftTit: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },


  club: {
      backgroundColor: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginBottom: 8,        
  },
  clubText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LeftCol;

  