import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

type AddBoardProps = {
  onSave?: () => void;
};

const AddBoard = ({ onSave }: AddBoardProps) => {
  const [boardName, setBoardName] = useState<string>("");

  return (
    <View style={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Add a Board</Text>
        <Button title="Save" onPress={onSave} />
      </View>
      <Text style={styles.subtitle}>Board name</Text>
      <TextInput
        placeholder="Board"
        style={styles.input}
        value={boardName}
        onChangeText={setBoardName}
        placeholderTextColor="#999"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    height: 48,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 12,
    color: "black",
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColorOption: {
    borderColor: "#000",
    transform: [{ scale: 1.1 }],
  },
  dropdown: {
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: "#ddd",
  },
  selectedItem: {
    backgroundColor: "#f0f7ff",
  },
  listItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  listLabel: {
    fontSize: 15,
  },
});

export default AddBoard;
