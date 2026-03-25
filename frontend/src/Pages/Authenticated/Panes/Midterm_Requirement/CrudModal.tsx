import React, { useState } from "react";
import EstrellanesAPI from "@/API/Authenticated/estrellanes/estrellanes";

interface CrudModalProps {
  id: number;
  name: string;
  onClose: () => void;
  // Added an optional callback so the parent component knows when to refresh the list
  onSuccess?: () => void; 
  age?: number | null;
  yr_lvl?: number | null;
  course?: string | null;
}

export default function CrudModal({ id, name, onClose, onSuccess, age: initialAge, yr_lvl: initialYrLvl, course: initialCourse }: CrudModalProps) {
  // State for form data, loading UI, and error handling
  const [recordName, setRecordName] = useState(name);
  const [age, setAge] = useState<number | "">("");
  const [yrLvl, setYrLvl] = useState<number | "">("");
  const [course, setCourse] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    setRecordName(name);
  }, [name]);
  React.useEffect(() => {
    setAge(typeof initialAge === 'number' ? initialAge : (initialAge === null ? "" : initialAge));
    setYrLvl(typeof initialYrLvl === 'number' ? initialYrLvl : (initialYrLvl === null ? "" : initialYrLvl));
    setCourse(initialCourse ?? "");
  }, [initialAge, initialYrLvl, initialCourse]);

  const handleUpdate = async () => {
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      await EstrellanesAPI({
        req_method: "PUT",
        id: id,
        data: { 
          name: recordName,
          age: age === "" ? null : Number(age),
          yr_lvl: yrLvl === "" ? null : Number(yrLvl),
          course: course?.trim() || null
        },
      });
      if (onSuccess) onSuccess(); 
      onClose(); 
    } catch (error) {
      setErrorMessage(error.message || "Failed to save changes.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      await EstrellanesAPI({
        req_method: "DELETE",
        id: id,
      });
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete record.");
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
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Manage Record
        </h2>
        
        {errorMessage && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
            {errorMessage}
          </div>
        )}
        
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Record ID
            </label>
            <input
              type="text"
              value={id}
              disabled
              className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={recordName}
              onChange={(e) => setRecordName(e.target.value)}
              disabled={isProcessing}
              className="w-full p-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
              placeholder="Enter record name"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                disabled={isProcessing}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year Level</label>
              <input
                type="number"
                value={yrLvl}
                onChange={(e) => setYrLvl(e.target.value === "" ? "" : Number(e.target.value))}
                disabled={isProcessing}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              disabled={isProcessing}
              className="w-full p-2.5 bg-white border border-gray-300 rounded-lg outline-none"
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <button
            onClick={handleDelete}
            disabled={isProcessing}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
          >
            Delete
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center min-w-[120px]"
            >
              {isProcessing ? "Processing..." : "Save Changes"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}