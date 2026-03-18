import React, { useState, useEffect, useCallback } from "react";
import EstrellanesAPI from "@/API/Authenticated/estrellanes/estrellanes";
import CrudModal from "./CrudModal";
import AddModal from "./AddModal";
import { Activity, Plus } from "lucide-react";

interface EstrellanesItem {
  id?: number;
  name: string;
  "@id"?: string;
}

export default function Estrellanes() {
  const [data, setData] = useState<EstrellanesItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  
  const [openID, setOpenID] = useState<number>(0);
  const [currentData, setCurrentData] = useState<EstrellanesItem | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await EstrellanesAPI({ req_method: "GET_ALL" });
      setData(res.member || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getNumericId = (item: EstrellanesItem): number => {
    if (item.id) return item.id;
    if (item["@id"]) {
      const parts = item["@id"].split("/");
      return parseInt(parts[parts.length - 1], 10);
    }
    return 0;
  };

  const handleEditClick = (item: EstrellanesItem) => {
    setCurrentData(item);
    setOpenID(getNumericId(item));
    setIsEditModalOpen(true);
  };

  if (loading && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] font-ceramon">
        <div className="relative">
          <Activity className="h-12 w-12 text-indigo-600 animate-pulse stroke-1" />
        </div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading Schedule...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Record
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((m, index) => (
          <div 
            key={m["@id"] ?? index}
            onClick={() => handleEditClick(m)}
            className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-100 cursor-pointer transition-all flex items-center justify-between group"
          >
            <p className="font-medium text-gray-700">{m.name}</p>
            <span className="text-xs text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
              Edit
            </span>
          </div>
        ))}
      </div>

      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchData} 
      />

      {isEditModalOpen && currentData && (
        <CrudModal
          id={openID}
          name={currentData.name}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}