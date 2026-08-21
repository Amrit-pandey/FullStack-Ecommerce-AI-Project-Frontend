import { Product } from "@/types/products";
import { useState } from "react";

export const useDialog = <T extends string = string>() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>()
  const [actionType, setActionType] = useState<T | null>(null);
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false);

  const openDialog = (id: number | null, type: T, product: Product | null = null) => {
    setSelectedId(id);
    setActionType(type);
    setIsOpen(true);
    setSelectedProduct(product)
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
    selectedProduct,
    setSelectedProduct
  };
};
