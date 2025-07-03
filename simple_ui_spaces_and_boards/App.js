import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";

import spacesData from "./jsons/boards.json";

export default function App() {
  const [data] = useState(spacesData);
  const [boards] = useState(spacesData[0].boards);

  const renderSpaces = ({ item, drag }) => (
    <Pressable onLongPress={drag}>
      <View
        key={item.order}
        style={[styles.tabContainer, { borderColor: item.color }]}
      >
        <View
          style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}
        >
          <MaterialIcons name={item.icon} size={32} color={item.color} />
        </View>
        <View
          style={{
            height: 1,
            width: "80%",
            backgroundColor: item.color,
            marginVertical: 14,
          }}
        />
        <Text style={styles.tabText}>{item.name}</Text>
      </View>
    </Pressable>
  );

  const renderTask = ({ item: task, drag }) => (
    <View style={[styles.boardTask]}>
      <View style={styles.boardTitle}>
        <Text onLongPress={drag}>{task.title}</Text>
        <MaterialIcons
          name="drag-handle"
          size={24}
          color="grey"
          onLongPress={drag}
        />
      </View>
    </View>
  );

  const renderBoard = ({ item: board, drag }) => (
    <View style={styles.boardContainer}>
      <View style={styles.boardTitle}>
        <Text style={styles.boardTitle} onLongPress={drag}>
          {board.project}
        </Text>
        <MaterialIcons
          name="drag-indicator"
          size={24}
          color="grey"
          onLongPress={drag}
        />
      </View>

      <DraggableFlatList
        data={board.tasks}
        keyExtractor={(task) => task.id.toString()}
        renderItem={renderTask}
        nestedScrollEnabled={false}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.appbar}>
          <Text style={styles.appBarTitle}>Spaces</Text>
        </View>

        <View style={{ flex: 1, padding: 12 }}>
          <DraggableFlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderSpaces}
          />

          <Text style={styles.Title}>Boards</Text>
          <DraggableFlatList
            data={boards}
            keyExtractor={(board) => board.id.toString()}
            renderItem={renderBoard}
            scrollEnabled={false}
          />
        </View>
      </SafeAreaView>
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
  tabContainer: {
    borderRadius: 10,
    height: 170,
    width: 140,
    padding: 10,
    marginRight: 10,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  Title: {
    color: "black",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
  },
  boardContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  boardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  boardTask: {
    padding: 10,
    backgroundColor: "#eee",
    marginVertical: 4,
    borderRadius: 5,
  },
});
