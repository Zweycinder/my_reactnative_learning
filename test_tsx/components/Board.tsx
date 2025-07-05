import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

import type { BoardItem, TaskItem as TaskType } from "../app";

import TaskItem from "./TaskItem";

type Props = {
  board: BoardItem;
};

export default function Board({ board }: Props) {
  const renderTask = ({ item, drag }: { item: TaskType; drag: () => void }) => (
    <TaskItem task={item} onLongPress={drag} />
  );

  return (
    <View style={styles.boardContainer}>
      <View style={styles.boardTitle}>
        <Text style={styles.boardTitleText}>{board.project}</Text>
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons name="add" size={24} color="grey" />
          <MaterialIcons
            name="drag-indicator"
            size={24}
            color="grey"
            style={{ marginLeft: 10 }}
          />
        </View>
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
}

const styles = StyleSheet.create({
  boardContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#b8b8b8",
  },
  boardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  boardTitleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
