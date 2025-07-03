import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SpaceItem } from "..";

type Props = {
  space: SpaceItem;
  onLongPress: () => void;
  onPress: () => void;
};

export default function SpaceCard({ space, onLongPress, onPress }: Props) {
  if (space.id === -1) {
    return (
      <Pressable onPress={onPress} style={styles.plusTabContainer}>
        <MaterialIcons name="add" size={32} color="#6200ee" />
      </Pressable>
    );
  } else
    return (
      <Pressable onLongPress={onLongPress} onPress={onPress}>
        <View style={[styles.tabContainer, { borderColor: space.color }]}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${space.color}20` },
            ]}
          >
            <MaterialIcons name={space.icon} size={32} color={space.color} />
          </View>
          <View
            style={{
              height: 1,
              width: "80%",
              backgroundColor: space.color,
              marginVertical: 14,
            }}
          />
          <Text style={styles.tabText}>{space.name}</Text>
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
});
