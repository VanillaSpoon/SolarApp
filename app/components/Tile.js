import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { Dimensions } from "react-native";
import colors from "../config/colors";
const win = Dimensions.get("window");

function Tile({ title, address, image, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.tile}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.address} numberOfLines={2}>
            {address}
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
    marginBottom: 30,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  address: {
    color: colors.secondary,
    fontWeight: "bold",
    marginBottom: 7,
  },
  title: {
    marginBottom: 7,
    fontWeight: "bold",
  },
});

export default Tile;
