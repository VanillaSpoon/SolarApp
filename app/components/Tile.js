import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../config/colors";

function Tile({ title, address, image, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.tile}>
        <View>
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
    marginBottom: 25,
    alignContent: "flex-end",
    overflow: "hidden",
    flexDirection: "row",
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
