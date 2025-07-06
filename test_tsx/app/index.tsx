import BottomSheet from "@gorhom/bottom-sheet";

import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import DraggableFlatList from "react-native-draggable-flatlist";
import Board from "../components/homepage/Board";

import CustomBottomSheet from "@/components/CustomBottomSheet";
import AddBoard from "@/components/homepage/addboard";
import AddSpaceContent from "../components/homepage/addspaces";
import SpaceCard from "../components/homepage/SpaceCards";
import spacesData from "../data/boards.json";

export type SpaceItem = {
  id: number;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  order: number;
  boards: BoardItem[];
};

export type BoardItem = {
  id: number;
  project: string;
  tasks: TaskItem[];
};

export type TaskItem = {
  id: number;
  title: string;
};
export default function HomeScreen() {
  const bottomSheetAddSpace = useRef<BottomSheet>(null);
  const bottomSheetAddBoard = useRef<BottomSheet>(null);

  const [selectedSpaceId, setSelectedSpaceId] = useState<number | null>(null);
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
      bottomSheetAddSpace.current?.snapToIndex(2);
    } else {
      setSelectedSpaceId(space.id);
      setBoards(space.boards || []);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.Title}>Spaces</Text>,
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
                  isSelected={selectedSpaceId === item.id}
                />
              )}
              onDragEnd={({ data }) => setData(data)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 16,
              marginTop: 16,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.Title2}>Boards</Text>
            <Pressable
              onPress={() => {
                bottomSheetAddBoard.current?.snapToIndex(1);
              }}
            >
              <MaterialIcons name="add" size={24} style={{ marginRight: 10 }} />
            </Pressable>
          </View>

          <DraggableFlatList
            data={boards}
            keyExtractor={(board) => board.id.toString()}
            renderItem={({ item, drag }) => <Board board={item} />}
            scrollEnabled={false}
          />
        </View>
      </SafeAreaView>

      <CustomBottomSheet bottomSheetRef={bottomSheetAddSpace}>
        <AddSpaceContent />
      </CustomBottomSheet>
      <CustomBottomSheet bottomSheetRef={bottomSheetAddBoard}>
        <AddBoard />
      </CustomBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  Title: {
    paddingHorizontal: 16,
    color: "black",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
  },

  Title2: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },
  spacesContainer: {
    flexDirection: "row",
    overflow: "hidden",
  },
});

/*
ideas:
  pen (edit mode)
  1- shake the board to show it can be re ordered 

*/
