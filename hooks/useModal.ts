import { useState } from "react";

export const useDialog = <T extends string = string>() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [actionType, setActionType] = useState<T | null>(null);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  const openDialog = (id: number | null, type: T) => {
    setSelectedId(id);
    setActionType(type);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSelectedId(null);
    setActionType(null);
    setIsActionLoading(false);
  };

  return {
    isOpen,
    setIsOpen,
    selectedId,
    actionType,
    isActionLoading,
    setIsActionLoading,
    openDialog,
    closeDialog,
  };
};
