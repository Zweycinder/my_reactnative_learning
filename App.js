import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const SpacesTabs = [
  {
    id: 1,
    name: "Workstation",
    icon: "work",
    color: "#6200ee",
  },
  {
    id: 2,
    name: "Projects",
    icon: "folder",
    color: "#03dac6",
  },
  {
    id: 3,
    name: "Personal",
    icon: "person",
    color: "#ff0266",
  },
  {
    id: 4,
    name: "Plans",
    icon: "event",
    color: "#018786",
  },
];

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.appbar}>
        <Text style={styles.appBarTitle}>Spaces</Text>
      </View>

      <View style={{ flex: 1, padding: 12 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScrollable}
        >
          {SpacesTabs.map((tab) => (
            <View
              key={tab.id}
              style={[styles.tabContainer, { borderColor: tab.color }]}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${tab.color}20` },
                ]}
              >
                <MaterialIcons name={tab.icon} size={32} color={tab.color} />
              </View>
              <View
                style={{
                  height: 1,
                  width: "80%",
                  backgroundColor: tab.color,
                  marginVertical: 14,
                }}
              />
              <Text style={styles.tabText}>{tab.name}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.Title}>Boards</Text>
        <ScrollView>
          <View style={styles.boardContainer}>
            <Text style={styles.Title2}>Engneering</Text>
            <View style={styles.divider} />
            <Text style={styles.Title3}>task 1</Text>
            <Text style={styles.Title3}>task 2</Text>
          </View>
          <View style={styles.boardContainer}>
            <Text style={styles.Title2}>Design</Text>
            <View style={styles.divider} />
            <Text style={styles.Title3}>task 1</Text>
            <Text style={styles.Title3}>task 2</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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

  tabsScrollable: {
    maxHeight: 190,
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
  },
  Title2: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  Title3: {
    color: "black",
    fontSize: 18,
  },

  boardContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 3,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#000000",
    marginVertical: 8,
  },
});
