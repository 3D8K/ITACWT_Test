import { useEffect } from "react";
import { useModal } from "./ModalContext";

export const Modal = () => {
  const { isOpen, closeModal, modalContent } = useModal();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  if (!isOpen || !modalContent) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-8 pt-12 rounded-lg shadow-md relative">
        <h3 className="absolute top-8 left-8 text-blue-900 text-xl font-bold">
          Edit
        </h3>
        <button
          className="absolute top-8 right-8 text-gray-500"
          onClick={closeModal}
        >
          <strong className="text-xl align-center cursor-pointer alert-del">
            &times;
          </strong>
        </button>
        {modalContent}
      </div>
    </div>
  );
};
