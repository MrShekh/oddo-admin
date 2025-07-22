import React from "react";

const statusStyles = {
  Pending: "bg-gray-100 text-gray-800",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
  Cancelled: "bg-gray-200 text-gray-500",
};

const SwapsModal = ({ open, swap, onClose }) => {
  if (!open || !swap) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl" onClick={onClose}>&times;</button>
        <h3 className="text-xl font-bold mb-4">Swap Details</h3>
        <div className="mb-4 space-y-2">
          <div>
            <span className="font-semibold">From User:</span> <span className="text-blue-600 hover:underline cursor-pointer">{swap.from}</span>
          </div>
          <div>
            <span className="font-semibold">To User:</span> <span className="text-blue-600 hover:underline cursor-pointer">{swap.to}</span>
          </div>
          <div>
            <span className="font-semibold">Skill Offered:</span> <span className="font-semibold text-indigo-700">{swap.offered}</span>
          </div>
          <div>
            <span className="font-semibold">Skill Requested:</span> {swap.requested}
          </div>
          <div>
            <span className="font-semibold">Date Requested:</span> {swap.date}
          </div>
          <div>
            <span className="font-semibold">Current Status:</span> <span className={`px-3 py-1 rounded-full text-xs font-semibold ml-2 ${statusStyles[swap.status]}`}>{swap.status}</span>
          </div>
          {swap.message && (
            <div>
              <span className="font-semibold">Message:</span> <span className="italic text-gray-700">{swap.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapsModal; 