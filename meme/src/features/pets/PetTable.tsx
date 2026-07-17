// src/features/pets/PetTable.tsx
import React from 'react';
import type { Pet } from './types';

interface PetTableProps {
  pets: Pet[];
  onView: (pet: Pet) => void;
  onEdit: (pet: Pet) => void;
  onDelete: (pet: Pet) => void;
}

const getSpeciesIcon = (loai: string) => {
  switch (loai) {
    case 'Chó': return '🐕';
    case 'Mèo': return '🐈';
    case 'Chim': return '🦜';
    case 'Thỏ': return '🐇';
    default: return '🐾';
  }
};

const PetTable: React.FC<PetTableProps> = ({
  pets,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Tên</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Loại</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Giống</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Giới tính</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Ngày sinh</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Cân nặng</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Màu lông</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Mã KH</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {pets.length === 0 ? (
            <tr>
              <td colSpan={10} className="px-6 py-10 text-center text-gray-500">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            pets.map((pet, index) => (
              <tr key={pet.ma_vat_nuoi} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 text-sm font-medium text-gray-500">{index + 1}</td>
                <td className="px-6 py-5 font-semibold text-gray-900">{pet.ten}</td>
                <td className="px-6 py-5">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                    {getSpeciesIcon(pet.loai)} {pet.loai}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-gray-600">{pet.giong}</td>
                <td className="px-6 py-5 text-sm text-gray-600">
                  {pet.gioi_tinh === 'Đực' ? '♂ Đực' : '♀ Cái'}
                </td>
                <td className="px-6 py-5 text-sm text-gray-600">
                  {pet.ngay_sinh ? new Date(pet.ngay_sinh).toLocaleDateString('vi-VN') : '-'}
                </td>
                <td className="px-6 py-5 text-sm text-gray-600">{pet.can_nang} kg</td>
                <td className="px-6 py-5 text-sm text-gray-600">{pet.mau_long}</td>
                <td className="px-6 py-5 text-sm text-gray-600">{pet.ma_khach_hang}</td>
                <td className="px-6 py-5">
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => onView(pet)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-blue-50"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => onEdit(pet)}
                      className="text-amber-600 hover:text-amber-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-amber-50"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => onDelete(pet)}
                      className="text-red-600 hover:text-red-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-red-50"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PetTable;