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
        <View style={styles.image}>
          <Image style={styles.image} source={image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.address} numberOfLines={5}>
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
    alignContent: "flex-end",
    overflow: "hidden",
    flexDirection: "row",
  },
  imageC: {
    justifyContent: "flex-start",
    flex: 1,
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
  },
  address: {
    color: colors.secondary,
    paddingTop: 5,
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
  },
});

export default Tile;
