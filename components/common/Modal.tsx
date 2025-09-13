
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-full overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
            >
                <div className="p-6">
                    {children}
                </div>
            </div>
            <div className="fixed inset-0 z-40" onClick={onClose}></div>
        </div>
    );
};

export default Modal;
