import create from "zustand";
import spacesData from "./jsons/boards.json";

const useStore = create((set) => ({
  spaces: spacesData,
  selectedTabIndex: 0,
  setSpaces: (newSpaces) => set({ spaces: newSpaces }),
  setSelectedTabIndex: (index) => set({ selectedTabIndex: index }),
}));
