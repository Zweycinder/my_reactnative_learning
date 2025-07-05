import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default function Settings() {
  const [albums, setAlbums] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums?_start=0&_limit=20")
      .then((res) => res.json())
      .then((data) => setAlbums(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={[styles.Title]}>Album</Text>
      <View style={styles.listContainer}>
        <FlatList
          data={albums}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.AlbumContainer}>
              <Text style={styles.sublabel}>ID {item.id}</Text>
              <View style={styles.titleContainer}>
                <Text style={styles.label} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  Title: {
    paddingHorizontal: 16,
    color: "black",
    fontSize: 40,
    marginTop: 20,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    padding: 12,
  },
  AlbumContainer: {
    flexDirection: "row",
    minHeight: 80,
    width: "100%",
    padding: 10,
    backgroundColor: "#e8e8e8",
    marginVertical: 4,
    borderRadius: 10,
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    flexShrink: 1,
  },
  label: {
    fontSize: 18,
    flexWrap: "wrap",
    marginLeft: 8,
  },
  sublabel: {
    fontSize: 16,
    color: "grey",
    width: 50,
  },
});
