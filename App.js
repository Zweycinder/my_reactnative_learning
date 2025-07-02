import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [tabs, setTabs] = useState(SpacesTabs);
  const [boards, setBoards] = useState(Boards);

  const renderTask = ({ item: task, drag }) => (
    <View
      style={{
        padding: 10,
        backgroundColor: "#eee",
        marginVertical: 4,
        borderRadius: 5,
      }}
    >
      <Text onLongPress={drag}>{task.title}</Text>
    </View>
  );

  const renderBoard = ({ item: board, drag }) => (
    <View style={styles.boardContainer}>
      <Text style={styles.boardTitle} onLongPress={drag}>
        {board.project}
      </Text>

      <DraggableFlatList
        data={board.tasks}
        keyExtractor={(task) => task.id.toString()}
        onDragEnd={({ data }) => {
          const updatedBoards = boards.map((b) =>
            b.id === board.id ? { ...b, tasks: data } : b
          );
          setBoards(updatedBoards);
          AsyncStorage.setItem("boardsOrder", JSON.stringify(updatedBoards));
        }}
        renderItem={renderTask}
        nestedScrollEnabled
      />
    </View>
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedTabs = await AsyncStorage.getItem("tabsOrder");
        if (savedTabs) {
          setTabs(JSON.parse(savedTabs));
        }

        const savedBoards = await AsyncStorage.getItem("boardsOrder");
        if (savedBoards) {
          setBoards(JSON.parse(savedBoards));
        }
      } catch (e) {
        console.error("Failed to load data", e);
      }
    };

    loadData();
  }, []);

  const onTabsDragEnd = ({ data }) => {
    setTabs(data);
    AsyncStorage.setItem("tabsOrder", JSON.stringify(data));
  };

  const onBoardsDragEnd = ({ data }) => {
    setBoards(data);
    AsyncStorage.setItem("boardsOrder", JSON.stringify(data));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.appbar}>
          <Text style={styles.appBarTitle}>Spaces</Text>
        </View>

        <View style={{ flex: 1, padding: 12 }}>
          <DraggableFlatList
            showsHorizontalScrollIndicator={false}
            data={tabs}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            onDragEnd={onTabsDragEnd}
            renderItem={({ item, drag, isActive }) => (
              <Pressable onLongPress={drag}>
                <View
                  key={item.id}
                  style={[styles.tabContainer, { borderColor: item.color }]}
                >
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: `${item.color}20` },
                    ]}
                  >
                    <MaterialIcons
                      name={item.icon}
                      size={32}
                      color={item.color}
                    />
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
            )}
          />

          <Text style={styles.Title}>Boards</Text>

          <DraggableFlatList
            data={boards}
            keyExtractor={(board) => board.id.toString()}
            onDragEnd={onBoardsDragEnd}
            renderItem={renderBoard}
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
const SpacesTabs = [
  {
    id: 1,
    order: 1,
    name: "Workstation",
    icon: "work",
    color: "#6200ee",
  },
  {
    id: 2,
    order: 2,
    name: "Projects",
    icon: "folder",
    color: "#03dac6",
  },
  {
    id: 3,
    order: 3,
    name: "Personal",
    icon: "person",
    color: "#ff0266",
  },
  {
    id: 4,
    order: 4,
    name: "Plans",
    icon: "event",
    color: "#018786",
  },
];

const Boards = [
  {
    id: 1,
    order: 1,
    project: "Engneering",
    tasks: [
      {
        id: 1,
        order: 1,
        title: "Task 1: Setup development environment",
      },
      {
        id: 2,
        order: 2,
        title: "Task 2: Create first Hello World app",
      },
      {
        id: 3,
        order: 3,
        title: "task 3: Implement navigation",
      },
    ],
  },
  {
    id: 2,
    order: 2,
    project: "Designing",
    tasks: [
      {
        id: 1,
        order: 1,
        title: "Task 1: Create wireframes",
      },
      {
        id: 2,
        order: 2,
        title: "task 2: Design UI components",
      },
    ],
  },
];
