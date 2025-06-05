interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
  description: string;
}

const Modal = ({ isOpen, onClose, imageUrl, alt, description }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-lg p-4 max-w-xl w-full shadow-lg max-h-[90vh] overflow-auto"
        onClick={handleModalClick}
      >
        <img
          src={imageUrl}
          alt={alt}
          className="w-full max-h-[65vh] object-contain rounded mb-4"
        />
        <p className="text-gray-700">{description}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
