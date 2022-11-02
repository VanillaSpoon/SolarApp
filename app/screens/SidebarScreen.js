import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Screen from "../components/Screen";

const menuItems = [
  {
    title: "Settings",
  },
];

function SidebarScreen() {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Eoin Gallinagh"
          subTitle="eoingall@gmail.com"
          image={require("../assets/images/face.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => <ListItem title={item.title} />}
        />
      </View>
      <ListItem title="Log Out" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default SidebarScreen;
