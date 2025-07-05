import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";
import React from "react";
import CustomBottomSheet from "./CustomBottomSheet";
import AddSpaceContent from "./homepage/addspaces";

type AddSpaceBottomSheetProps = {
  bottomSheetRef: React.RefObject<BottomSheet | null>;
  onSave?: () => void;
};

const AddSpaceBottomSheet = ({
  bottomSheetRef,
  onSave,
}: AddSpaceBottomSheetProps) => {
  return (
    <CustomBottomSheet bottomSheetRef={bottomSheetRef}>
      <AddSpaceContent onSave={onSave} />
    </CustomBottomSheet>
  );
};

export default AddSpaceBottomSheet;
