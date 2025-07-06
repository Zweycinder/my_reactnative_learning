import { SpaceItem } from "@/app";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  space: SpaceItem;
  onLongPress: () => void;
  onPress: () => void;
  isSelected?: boolean;
};

export default function SpaceCard({
  space,
  onLongPress,
  onPress,
  isSelected = false,
}: Props) {
  if (space.id === -1) {
    return (
      <Pressable onPress={onPress} style={styles.plusTabContainer}>
        <MaterialIcons name="add" size={32} color="#6200ee" />
      </Pressable>
    );
  } else
    return (
      <Pressable onLongPress={onLongPress} onPress={onPress}>
        <View
          style={[
            styles.tabContainer,
            { borderColor: `${space.color}30` },
            isSelected && {
              borderColor: `${space.color}40`,
              backgroundColor: `${space.color}10`,
            },
          ]}
        >
          <View style={styles.dragHandle}>
            <MaterialIcons
              name="drag-indicator"
              size={20}
              color={`${space.color}80`}
              style={styles.dragIcon}
            />
          </View>

          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${space.color}20` },
              isSelected && {
                backgroundColor: `${space.color}40`,
              },
            ]}
          >
            <Text style={{ fontSize: 20 }}>{space.name[0]}</Text>
          </View>
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: space.color,
              marginVertical: 14,
            }}
          />
          <Text
            style={[
              styles.tabText,
              isSelected && {
                color: space.color,
              },
            ]}
          >
            {space.name}
          </Text>
        </View>
      </Pressable>
    );
}

const styles = StyleSheet.create({
  tabContainer: {
    borderRadius: 10,
    height: 170,
    width: 140,
    padding: 10,
    marginRight: 10,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // Needed for absolute positioning of drag handle
  },
  plusTabContainer: {
    height: 170,
    width: 140,
    padding: 10,
    marginRight: 10,
    borderWidth: 3,
    borderColor: "#6200ee",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    borderStyle: "dashed",
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
  dragHandle: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 4,
  },
  dragIcon: {
    opacity: 0.6,
  },
});
