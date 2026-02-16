interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt: string;
  description: string;
}

const Modal = ({ isOpen, onClose, imageUrl, alt, description }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* სურათის კონტეინერი ფიქსირებული ასპექტით */}
        <div className="relative w-full aspect-video bg-gray-100">
          <img
            src={imageUrl}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover" 
            // object-cover უზრუნველყოფს, რომ სურათმა შეავსოს სივრცე და არ შეიკუმშოს
          />
        </div>

        {/* ტექსტის და ღილაკის სექცია */}
        <div className="p-6 flex flex-col gap-4">
          <div className="max-h-32 overflow-y-auto">
             <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-900 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
