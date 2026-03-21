import React, { useState } from "react";
import EstrellanesAPI from "@/API/Authenticated/estrellanes/estrellanes";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddModal({ isOpen, onClose, onSuccess }: AddModalProps) {
  const [name, setName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!name.trim()) {
      setErrorMessage("Please enter a name.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      await EstrellanesAPI({
        req_method: "POST",
        data: { name: name.trim() },
      });
      setName(""); // Clear input on success
      onSuccess(); // Refresh the list
      onClose();   // Close the modal
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to create new record.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-md transition-all">
      <div className="relative w-full max-w-md p-6 bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl">
        
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Record</h2>

        {errorMessage && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
            {errorMessage}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isProcessing}
            className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            placeholder="Enter new record name"
            autoFocus
          />
        </div>

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={isProcessing}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center min-w-[120px]"
          >
            {isProcessing ? "Saving..." : "Create Record"}
          </button>
        </div>
      </div>
    </div>
  );
}