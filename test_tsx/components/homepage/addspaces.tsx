import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const COLORS = [
  "#FF9AA2",
  "#FFB7B2",
  "#FFDAC1",
  "#E2F0CB",
  "#B5EAD7",
  "#C7CEEA",
];

// Sample projects data
const PROJECTS = [
  { label: "To-Do", value: "0" },
  { label: "InProgress", value: "2" },
  { label: "Complated", value: "1" },
  { label: "Rejected", value: "-1" },
  { label: "Waiting for review", value: "3" },
  { label: "On hold", value: "4" },
  { label: "To Post", value: "5" },
  { label: "Overdue", value: "6" },
  { label: "Suggestions", value: "7" },
];

type AddSpaceContentProps = {
  onSave?: () => void;
};

const AddSpaceContent = ({ onSave }: AddSpaceContentProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [spaceName, setSpaceName] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>([]);
  const [items, setItems] = useState(PROJECTS);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Add a space</Text>
        <Button title="Save" onPress={onSave} />
      </View>
      <Text style={styles.subtitle}>Space name</Text>
      <TextInput
        placeholder="Space name"
        style={styles.input}
        value={spaceName}
        onChangeText={setSpaceName}
        placeholderTextColor="#999"
      />
      <Text style={styles.subtitle}>Project name</Text>
      <TextInput
        placeholder="Project name"
        style={styles.input}
        value={projectName}
        onChangeText={setProjectName}
        placeholderTextColor="#999"
      />

      <Text style={styles.subtitle}>Boards</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={true}
        mode="BADGE"
        badgeColors={COLORS}
        badgeDotColors={"black"}
        placeholder="Select boards..."
        placeholderStyle={{ color: "#999" }}
        listMode="SCROLLVIEW"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        selectedItemContainerStyle={styles.selectedItem}
        showBadgeDot={true}
        listItemContainerStyle={styles.listItem}
        listItemLabelStyle={styles.listLabel}
        zIndex={1000}
        zIndexInverse={1000}
      />

      <Text style={styles.subtitle}>Choose a color</Text>
      <View style={styles.colorContainer}>
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorOption,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColorOption,
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
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

export default AddSpaceContent;
