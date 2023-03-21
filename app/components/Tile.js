import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";

function Tile({ title, energyOutput, image, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.tile}>
        <View>
          <Image style={styles.image} source={image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
          <Text style={styles.energyOutput} numberOfLines={5}>
            {energyOutput}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 25,
    padding: 10,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailsContainer: {
    paddingBottom: 100,
    paddingLeft: 20,
    justifyContent: "flex-end",
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  energyOutput: {
    color: colors.primary,
    paddingTop: 5,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
  },
});

export default Tile;
