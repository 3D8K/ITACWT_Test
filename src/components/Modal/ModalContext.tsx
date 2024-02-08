import React, { createContext, useContext, ReactNode, useState } from "react";

interface ModalContextProps {
  children: ReactNode;
}

interface ModalContextValue {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  modalContent: ReactNode;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export const ModalProvider: React.FC<ModalContextProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setIsOpen(false);
  };

  const value: ModalContextValue = {
    isOpen,
    openModal,
    closeModal,
    modalContent,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
