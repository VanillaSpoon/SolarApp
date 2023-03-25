import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Screen from "../components/Screen";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

const PropertyScreen = ({ route }) => {
  const {
    markers,
    averageAltitude,
    averageSunExposure,
    energyOutput,
    searchText,
  } = route.params;

  return (
    <Screen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.infoSection}>
          <Text style={styles.label}>Address: </Text>
          <Text>{searchText}</Text>
          <Text style={styles.label}>Average Altitude: </Text>
          <Text>{averageAltitude} meters</Text>
          <Text style={styles.label}>Average Sun Exposure: </Text>
          <Text>{averageSunExposure} W/m²</Text>
        </View>

        <View style={styles.markerSection}>
          <View style={styles.row}>
            <Text style={[styles.label, styles.flex1]}>Marker</Text>
            <Text style={[styles.label, styles.flex1]}>Longitude</Text>
            <Text style={[styles.label, styles.flex1]}>Latitude</Text>
          </View>
          {markers.map((marker, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.flex1}>{`Marker ${index + 1}`}</Text>
              <Text style={styles.flex1}>{marker.longitude.toFixed(6)}</Text>
              <Text style={styles.flex1}>{marker.latitude.toFixed(6)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.estimationSection}>
          <Text style={styles.estimationTitle}>
            Annual Energy Production Estimation
          </Text>
          <Text style={styles.estimationValue}>{energyOutput} kWh</Text>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoSection: {
    marginTop: 15,
    marginBottom: 30,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
  },
  markerSection: {
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  flex1: {
    flex: 1,
  },
  estimationSection: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    padding: 15,
    backgroundColor: colors.light,
    borderRadius: 10,
  },
  estimationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  estimationValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
  },
});

export default PropertyScreen;
