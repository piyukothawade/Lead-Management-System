import { X } from "lucide-react";

function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      
      <div className="bg-white rounded-xl shadow-xl w-[400px] p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          <X size={18} />
        </button>

        {/* Title */}
        {title && (
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            {title}
          </h2>
        )}

        {/* Content */}
        {children}

      </div>
    </div>
  );
}

export default Modal;