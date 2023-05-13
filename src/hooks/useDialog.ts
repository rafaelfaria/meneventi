import { useState } from "react";

export const useDialog = () => {
  const [openDialog, setIsDialogOpen] = useState(false);

  const toggleDialog = () => setIsDialogOpen(!openDialog);

  return {
    openDialog,
    toggleDialog,
    setIsDialogOpen
  };
};