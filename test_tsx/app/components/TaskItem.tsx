import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { TaskItem as TaskType } from "..";

type Props = {
  task: TaskType;
  onLongPress: () => void;
};

export default function TaskItem({ task, onLongPress }: Props) {
  return (
    <View style={styles.boardTask}>
      <View style={styles.boardTitle}>
        <Text onLongPress={onLongPress}>{task.title}</Text>
        <MaterialIcons
          name="drag-handle"
          size={24}
          color="grey"
          onLongPress={onLongPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boardTask: {
    padding: 10,
    backgroundColor: "#eee",
    marginVertical: 4,
    borderRadius: 5,
  },
  boardTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
