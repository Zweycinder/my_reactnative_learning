import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type AddSpaceBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
};

const COLORS = [
  "#FF9AA2",
  "#FFB7B2",
  "#FFDAC1",
  "#E2F0CB",
  "#B5EAD7",
  "#C7CEEA",
];

const AddSpaceBottomSheet = ({ bottomSheetRef }: AddSpaceBottomSheetProps) => {
  const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);
  const [spaceName, setSpaceName] = useState<string>("");

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["25%", "60%", "80%"]}
      index={-1}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.container}>
        <Text style={styles.title}>Add a space</Text>

        <TextInput
          placeholder="Enter space name"
          style={styles.input}
          value={spaceName}
          onChangeText={setSpaceName}
          placeholderTextColor="#999"
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
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  iconPreviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconPreview: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconLabel: {
    fontSize: 16,
    color: "#666",
  },
  iconPickerContainer: {
    maxHeight: 180,
    marginBottom: 20,
  },
  iconOption: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
    borderRadius: 24,
  },
  selectedIconOption: {
    backgroundColor: "rgba(0,0,0,0.1)",
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
    color: "#666",
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
});

export default AddSpaceBottomSheet;
