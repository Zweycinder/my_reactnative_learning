import { MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import type { SpaceItem } from "..";
import Board from "../components/Board";
import AddSpaceBottomSheet from "../components/bottomsheet";
import SpaceCard from "../components/SpaceCards";
import spacesData from "../data/boards.json";

export default function HomeScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [data, setData] = useState<SpaceItem[]>([
    ...spacesData.map((space: any) => ({
      ...space,
      icon: space.icon as keyof typeof MaterialIcons.glyphMap,
    })),
    { id: -1, name: "Add", icon: "add", color: "lightgray", boards: [] },
  ]);

  const [boards, setBoards] = useState(data[1]?.boards || []);

  const cardPress = (space: SpaceItem) => {
    if (space.id === -1) {
      bottomSheetRef.current?.snapToIndex(2);
    } else {
      setBoards(space.boards || []);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.appbar}>
          <Text style={styles.appBarTitle}>Spaces</Text>
        </View>

        <View style={{ flex: 1, padding: 12 }}>
          <View style={styles.spacesContainer}>
            <DraggableFlatList
              showsHorizontalScrollIndicator={false}
              data={data}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, drag }) => (
                <SpaceCard
                  space={item}
                  onLongPress={drag}
                  onPress={() => cardPress(item)}
                />
              )}
              onDragEnd={({ data }) => setData(data)}
            />
          </View>

          <Text style={styles.Title}>Boards</Text>
          <DraggableFlatList
            data={boards}
            keyExtractor={(board) => board.id.toString()}
            renderItem={({ item, drag }) => <Board board={item} />}
            scrollEnabled={false}
          />
        </View>
      </SafeAreaView>

      {/* Use the separated BottomSheet component */}
      <AddSpaceBottomSheet bottomSheetRef={bottomSheetRef} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "#6200ee",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  appBarTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  Title: {
    color: "black",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
  },
  spacesContainer: {
    flexDirection: "row",
    overflow: "hidden",
  },
});
