// src/features/medicines/MedicineTable.tsx
import React from 'react';
import type { Medicine } from './types';

interface MedicineTableProps {
  medicines: Medicine[];
  onEdit: (medicine: Medicine) => void;
  onDelete: (medicine: Medicine) => void;
  onViewDescription: (medicine: Medicine) => void;
  onViewBatches: (medicine: Medicine) => void;
}

const formatMoney = (n: number) => n.toLocaleString('vi-VN') + ' đ';

const MedicineTable: React.FC<MedicineTableProps> = ({
  medicines,
  onEdit,
  onDelete,
  onViewDescription,
  onViewBatches,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              STT
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Tên thuốc
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Danh mục
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Mô tả
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Đơn vị
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Giá
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Tồn kho
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Tồn tối thiểu
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {medicines.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            medicines.map((med, index) => {
              const isLowStock = med.stock < med.minStock;
              const isDescriptionLong = (med.description || '').length > 30;
              const batchCount = med.batches?.length || 0;

              return (
                <tr key={med.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-500">
                    {index + 1}
                  </td>
                  <td 
                    className="px-6 py-4 font-medium text-blue-600 max-w-[200px] cursor-pointer hover:text-blue-800 hover:underline"
                    onClick={() => onViewBatches(med)}
                    title="Click để xem lô thuốc"
                  >
                    {med.name}
                    {batchCount > 0 && (
                      <span className="ml-2 text-xs text-gray-500 font-normal">
                        ({batchCount} lô)
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {med.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px]">
                    <span className="block truncate">
                      {med.description || '-'}
                    </span>
                    {isDescriptionLong && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDescription(med);
                        }}
                        className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-1"
                      >
                        (Xem thêm)
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {med.unit}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {formatMoney(med.price)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <span
                      className={
                        isLowStock ? 'text-red-600 font-bold' : 'text-gray-800'
                      }
                    >
                      {med.stock.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {med.minStock}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewBatches(med);
                        }}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
                      >
                        Lô thuốc
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(med);
                        }}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Cập nhật
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(med);
                        }}
                        className="text-red-600 hover:text-red-700 font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MedicineTable;