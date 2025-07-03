// types.ts
import { MaterialIcons } from "@expo/vector-icons";
// App.tsx
import React from "react";
import HomeScreen from "./screens/homescreen";

export type SpaceItem = {
  id: number;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  order: number;
  boards: BoardItem[];
};

export type BoardItem = {
  id: number;
  project: string;
  tasks: TaskItem[];
};

export type TaskItem = {
  id: number;
  title: string;
};

export default function App() {
  return <HomeScreen />;
}
