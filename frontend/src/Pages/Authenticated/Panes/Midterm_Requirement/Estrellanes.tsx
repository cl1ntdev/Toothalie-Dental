import React, { useState, useEffect, useCallback } from "react";
import EstrellanesAPI from "@/API/Authenticated/estrellanes/estrellanes";
import CrudModal from "./CrudModal";
import AddModal from "./AddModal";
import { Activity, Plus, Database, Edit2, Inbox, RefreshCw } from "lucide-react";

interface EstrellanesItem {
  id?: number;
  name: string;
  "@id"?: string;
  age?: number | null;
  yr_lvl?: number | null;
  course?: string | null;
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
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading Records...</p>
      </div>
    );
  }

  return (
    // Added font-ceramon to the main wrapper
    <div className="max-w-5xl mx-auto p-4 md:p-8 font-ceramon">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Estrellanes Records</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and organize your data entries efficiently.</p>
          </div>
        </div>
        
        {/* Action Buttons Group */}
        <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center justify-center p-2.5 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-indigo-600 transition-colors disabled:opacity-50 shadow-sm"
            title="Refresh records"
            aria-label="Refresh records"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin text-indigo-600" : ""}`} />
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 transition-all flex-1 sm:flex-none justify-center"
          >
            <Plus className="w-4 h-4" />
            Add Record
          </button>
        </div>
      </div>

      {/* Empty State Handle */}
      {!loading && data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <Inbox className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No records found</h3>
          <p className="text-gray-500 mb-4">Get started by creating a new Estrellanes entry.</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
          >
            + Create your first record
          </button>
        </div>
      ) : (
        /* Data Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((m, index) => {
            const numericId = getNumericId(m);
            return (
              <div 
                key={m["@id"] ?? index}
                onClick={() => handleEditClick(m)}
                className="group relative p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 cursor-pointer transition-all duration-200 overflow-hidden flex flex-col justify-between min-h-[100px]"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                    ID: {numericId > 0 ? numericId : 'New'}
                  </span>
                  
                  <div className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-200">
                    <Edit2 className="w-4 h-4" />
                  </div>
                </div>

                <p className="font-semibold text-gray-800 truncate group-hover:text-indigo-700 transition-colors">
                  {m.name}
                </p>

                <p className="text-sm text-gray-500 mt-1 truncate">{m.course ?? '—'}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                  <span>Age: {m.age ?? '—'}</span>
                  <span>Year: {m.yr_lvl ?? '—'}</span>
                </div>

                <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-indigo-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10" />
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchData} 
      />

      {isEditModalOpen && currentData && (
        <CrudModal
          id={openID}
          name={currentData.name}
          age={currentData.age ?? null}
          yr_lvl={currentData.yr_lvl ?? null}
          course={currentData.course ?? null}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={fetchData}
        />
      )}
    </div>
  );
}