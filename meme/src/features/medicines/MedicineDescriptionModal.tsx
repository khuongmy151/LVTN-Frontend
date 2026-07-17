// src/features/medicines/MedicineDescriptionModal.tsx
import React from 'react';
import type { Medicine } from './types';

interface MedicineDescriptionModalProps {
  medicine: Medicine;
  onClose: () => void;
}

const MedicineDescriptionModal: React.FC<MedicineDescriptionModalProps> = ({
  medicine,
  onClose,
}) => {
  return (
    <div className="p-8">
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-red-700">Mô tả</h2>
        <div className="text-lg font-semibold text-gray-800 mt-2">
          &lt; {medicine.name} &gt;
        </div>
      </div>

      {/* Nội dung mô tả */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 min-h-[200px]">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {medicine.description || 'Không có mô tả.'}
        </p>
      </div>

      {/* Nút đóng */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onClose}
          className="px-8 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          [ Đóng ]
        </button>
      </div>
    </div>
  );
};

export default MedicineDescriptionModal;