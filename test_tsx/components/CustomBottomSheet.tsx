// components/CustomBottomSheet.tsx
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet } from "react-native";

type CustomBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  snapPoints?: (string | number)[];
  children: React.ReactNode;
  index?: number;
};

const CustomBottomSheet = ({
  bottomSheetRef,
  snapPoints = ["25%", "70%", "90%"],
  children,
  index = -1,
}: CustomBottomSheetProps) => {
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={index}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.container}>{children}</BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
});

export default CustomBottomSheet;
