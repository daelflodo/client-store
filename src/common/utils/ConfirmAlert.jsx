import { confirmAlert } from 'react-confirm-alert';

// Función reutilizable para el confirmAlert
const confirmDelete = ({ message, onConfirm }) => {
    confirmAlert({
        customUI: ({ onClose }) => (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h2 className="text-lg font-semibold mb-4">Confirm deletion</h2>
                <p className="text-gray-700 mb-4">{message}</p>
                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        Ok
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        )
    });
};

export default confirmDelete
