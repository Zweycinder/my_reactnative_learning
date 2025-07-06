import AlbumDetails from "@/components/album/albumdetails";
import CustomBottomSheet from "@/components/CustomBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList, Pressable } from "react-native-gesture-handler";

export default function Settings() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [albums, setAlbums] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(10);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums?_start=0&_limit=20`)
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Album</Text>
      <View style={styles.listContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={albums.slice(0, displayCount)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={async () => {
                  if (bottomSheetRef.current != null) {
                    bottomSheetRef.current?.close();
                    await new Promise((resolve) => setTimeout(resolve, 100));
                  }
                  setSelectedAlbumId(item.id);
                  bottomSheetRef.current?.snapToIndex(2);
                }}
              >
                <View style={styles.albumContainer}>
                  <Text style={styles.sublabel}>ID {item.id}</Text>
                  <View style={styles.titleContainer}>
                    <Text style={styles.label} numberOfLines={2}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
          <CustomBottomSheet bottomSheetRef={bottomSheetRef}>
            <AlbumDetails id={selectedAlbumId!} />
          </CustomBottomSheet>
        </View>

        <TouchableOpacity
          style={styles.showMoreButton}
          onPress={() => {
            setDisplayCount(displayCount <= 10 ? 20 : 10);
          }}
        >
          <Text style={styles.showMoreButtonText}>
            {displayCount <= 10 ? "Show More" : "Show Less"}
          </Text>
        </TouchableOpacity>

        <CustomBottomSheet bottomSheetRef={bottomSheetRef}>
          <AlbumDetails id={selectedAlbumId!} />
        </CustomBottomSheet>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    paddingHorizontal: 16,
    color: "black",
    fontSize: 40,
    marginTop: 20,
    fontWeight: "bold",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  albumContainer: {
    flexDirection: "row",
    minHeight: 80,
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
  showMoreButton: {
    position: "absolute",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    bottom: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },

  showMoreButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
