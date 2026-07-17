// src/features/pets/PetDetail.tsx
import React from 'react';
import type { Pet } from './types';

interface PetDetailProps {
  pet: Pet;
  onClose: () => void;
  onEdit?: (pet: Pet) => void;
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

const calculateAge = (ngay_sinh: string) => {
  if (!ngay_sinh) return 'Chưa rõ';
  const birth = new Date(ngay_sinh);
  const now = new Date();
  const years = now.getFullYear() - birth.getFullYear();
  const months = now.getMonth() - birth.getMonth();
  if (years > 0) return `${years} tuổi`;
  return `${months + 1} tháng`;
};

const PetDetail: React.FC<PetDetailProps> = ({ pet, onClose, onEdit }) => {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-amber-700">🐾 Thông tin vật nuôi</h2>
      </div>

      {/* Icon + Tên */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-40 h-40 bg-amber-100 rounded-full flex items-center justify-center text-8xl border-4 border-white shadow-lg overflow-hidden">
          {getSpeciesIcon(pet.loai)}
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mt-4">{pet.ten}</h3>
        <p className="text-gray-500">
          {getSpeciesIcon(pet.loai)} {pet.loai} • {pet.giong}
        </p>
      </div>

      {/* Thông tin chính */}
      <div className="grid grid-cols-2 gap-x-8 gap-y-5 text-gray-700 max-w-2xl mx-auto">
        <div>
          <div className="text-sm text-gray-500">Giới tính</div>
          <div className="font-semibold text-lg">
            {pet.gioi_tinh === 'Đực' ? '♂ Đực' : '♀ Cái'}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Ngày sinh</div>
          <div className="font-medium">
            {pet.ngay_sinh ? new Date(pet.ngay_sinh).toLocaleDateString('vi-VN') : 'Chưa rõ'}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Tuổi</div>
          <div className="font-medium">{calculateAge(pet.ngay_sinh)}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Màu lông</div>
          <div className="font-medium">{pet.mau_long}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Cân nặng</div>
          <div className="font-medium">{pet.can_nang} kg</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Mã khách hàng</div>
          <div className="font-semibold">{pet.ma_khach_hang}</div>
        </div>

        {/* Thông tin chủ (nếu có) */}
        {(pet.ten_khach_hang || pet.sdt_khach_hang) && (
          <div className="col-span-2 border-t-2 border-amber-200 pt-4 mt-2">
            <div className="text-sm font-bold text-amber-700 mb-2">Thông tin chủ sở hữu</div>
            <div className="grid grid-cols-2 gap-4">
              {pet.ten_khach_hang && (
                <div>
                  <div className="text-xs text-gray-500">Tên chủ</div>
                  <div className="font-semibold">{pet.ten_khach_hang}</div>
                </div>
              )}
              {pet.sdt_khach_hang && (
                <div>
                  <div className="text-xs text-gray-500">SĐT chủ</div>
                  <div className="font-semibold">{pet.sdt_khach_hang}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ghi chú */}
        {pet.ghi_chu && (
          <div className="col-span-2">
            <div className="text-sm text-gray-500">📝 Ghi chú</div>
            <div className="font-medium bg-gray-50 p-4 rounded-2xl border border-gray-200">
              {pet.ghi_chu}
            </div>
          </div>
        )}

        {/* Ngày tạo + Ngày cập nhật */}
        <div>
          <div className="text-sm text-gray-500">Ngày tạo</div>
          <div className="font-medium">
            {pet.ngay_tao ? new Date(pet.ngay_tao).toLocaleDateString('vi-VN') : '-'}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Ngày cập nhật</div>
          <div className="font-medium">
            {pet.ngay_cap_nhat ? new Date(pet.ngay_cap_nhat).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-10 flex gap-4 justify-center">
        {onEdit && (
          <button
            onClick={() => onEdit(pet)}
            className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700"
          >
            Cập nhật thông tin
          </button>
        )}
        <button
          onClick={onClose}
          className="px-8 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
        >
          Thoát ra
        </button>
      </div>
    </div>
  );
};

export default PetDetail;